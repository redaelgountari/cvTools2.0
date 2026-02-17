// In-memory cache to improve UX during navigation (cleared on page refresh/F5)
const volatileCache = {};

/**
 * Utility for interacting with the server-side Redis cache API.
 * This prevents leaking Redis credentials to the client.
 */

async function cacheRequest(action, params = {}) {
  try {
    const response = await fetch('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...params })
    });

    if (!response.ok) throw new Error('Cache request failed');
    return await response.json();
  } catch (error) {
    console.error('Cache utility error:', error);
    return null;
  }
}

/**
 * @param {string} key
 * @param {any} data
 * @param {number|null} [expiryDays]
 */
export async function saveToStorage(key, data, expiryDays = null) {
  const expirySeconds = expiryDays ? expiryDays * 24 * 60 * 60 : null;
  const storageItem = {
    data,
    timestamp: Date.now(),
    expiry: expirySeconds ? Date.now() + (expirySeconds * 1000) : null
  };

  // Update in-memory cache for instant subsequent access
  volatileCache[key] = storageItem;

  const res = await cacheRequest('set', {
    key,
    data: storageItem,
    expirySeconds
  });
  return res?.success || false;
}

/**
 * @param {string} key
 * @param {any} data
 * @param {number|null} [expiryDays]
 */
export async function saveSettings(key, data, expiryDays = null) {
  return await saveToStorage(key, data, expiryDays);
}

export async function getFromStorage(key) {
  // Check volatile memory cache first
  const cached = volatileCache[key];
  if (cached) {
    if (!cached.expiry || cached.expiry > Date.now()) {
      return cached.data;
    }
    delete volatileCache[key];
  }

  const res = await cacheRequest('get', { key });
  if (!res?.result) return null;

  const storageItem = res.result;

  if (storageItem.expiry && storageItem.expiry < Date.now()) {
    await removeFromStorage(key);
    return null;
  }

  // Update volatile cache for next call
  volatileCache[key] = storageItem;

  return storageItem.data;
}

export async function removeFromStorage(key) {
  delete volatileCache[key];
  const res = await cacheRequest('del', { key });
  return res?.success || false;
}

export async function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    const testValue = 'test';
    await saveToStorage(testKey, testValue);
    const result = await getFromStorage(testKey);
    await removeFromStorage(testKey);
    return result === testValue;
  } catch (e) {
    return false;
  }
}