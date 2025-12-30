const REDIS_URL = "https://growing-alpaca-24643.upstash.io"
const REDIS_TOKEN = "AWBDAAIncDI3ODI1ZWIzNjUxNjY0NWY2OWVkYzhmZDE3YTM3N2FiOHAyMjQ2NDM"

/**
 * Makes a request to Upstash Redis REST API
 * @private
 */
async function redisRequest(command) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.error('Upstash Redis credentials not configured');
    return null;
  }

  try {
    // Encode each command part for URL safety
    const encodedCommand = command.map(part => encodeURIComponent(part)).join('/');
    
    const response = await fetch(`${REDIS_URL}/${encodedCommand}`, {
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Redis request failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Redis request error:', error);
    return null;
  }
}

/**
 * Saves data to Redis with optional expiration
 * @param {any} key - The key to store the data under
 * @param {any} data - The data to store (will be JSON stringified)
 * @param {number} expiryDays - Optional number of days until data expires
 */
export async function saveToStorage(key, data, expiryDays = null) {
  try {
    const timestamp = Date.now();
    const storageItem = { data, timestamp };

    if (expiryDays !== null) {
      storageItem.expiry = timestamp + expiryDays * 24 * 60 * 60 * 1000;
    }

    const value = JSON.stringify(storageItem);

    if (expiryDays !== null) {
      const expirySeconds = expiryDays * 24 * 60 * 60;
      await redisRequest(['SETEX', key, String(expirySeconds), value]);
    } else {
      await redisRequest(['SET', key, value]);
    }

    return true;
  } catch (error) {
    console.error('Error saving to Redis:', error);
    return false;
  }
}
export async function saveSettings(key, data, expiryDays = null) {
  try {
    // Create storage object
    const storageItem = {
      data: data,
      timestamp: new Date().getTime()
    };
    
    // Add expiration timestamp if specified
    if (expiryDays !== null) {
      storageItem.expiry = new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000);
    }
    
    const value = JSON.stringify(storageItem);
    
    // Save to Redis
    if (expiryDays !== null) {
      const expirySeconds = expiryDays * 24 * 60 * 60;
      await redisRequest(['SETEX', key, expirySeconds, value]);
    } else {
      await redisRequest(['SET', key, value]);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving settings to Redis:', error);
    return false;
  }
}

/**
 * Retrieves data from Redis, checking for expiration
 * @param {string} key - The key to retrieve data for
 * @returns {any|null} - The stored data or null if not found or expired
 */
export async function getFromStorage(key) {
  try {
    const storedItem = await redisRequest(['GET', key]);
    if (!storedItem) return null;
    
    // Parse the stored data
    const storageItem = JSON.parse(storedItem);
    
    // Check if expired (redundant with Redis TTL but kept for consistency)
    if (storageItem.expiry && storageItem.expiry < new Date().getTime()) {
      await redisRequest(['DEL', key]); 
      return null;
    }
    
    return storageItem.data;
  } catch (error) {
    console.error('Error retrieving from Redis:', error);
    return null;
  }
}

/**
 * Removes data from Redis
 * @param {string} key - The key to remove
 */
export async function removeFromStorage(key) {
  try {
    await redisRequest(['DEL', key]);
    return true;
  } catch (error) {
    console.error('Error removing from Redis:', error);
    return false;
  }
}

/**
 * Clears all app data from Redis
 * @param {string} prefix - Optional prefix to limit clearing to specific keys
 */
export async function clearStorage(prefix = '') {
  try {
    if (prefix) {
      // Get all keys with the specified prefix
      const keys = await redisRequest(['KEYS', `${prefix}*`]);
      if (keys && keys.length > 0) {
        // Delete all matching keys
        await redisRequest(['DEL', ...keys]);
      }
    } else {
      // WARNING: This clears ALL keys in your Redis database
      // Use with caution in production
      await redisRequest(['FLUSHDB']);
    }
    return true;
  } catch (error) {
    console.error('Error clearing Redis storage:', error);
    return false;
  }
}

/**
 * Checks if Redis is available and working
 * @returns {boolean} - Whether Redis is available
 */
export async function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    const testValue = 'test';
    await redisRequest(['SET', testKey, testValue]);
    const result = await redisRequest(['GET', testKey]);
    await redisRequest(['DEL', testKey]);
    return result === testValue;
  } catch (e) {
    console.error('Redis availability check failed:', e);
    return false;
  }
}

/**
 * Additional Redis-specific utilities
 */

/**
 * Set TTL (Time To Live) on an existing key
 * @param {string} key - The key to set expiration on
 * @param {number} seconds - Number of seconds until expiration
 */
export async function setExpiration(key, seconds) {
  try {
    await redisRequest(['EXPIRE', key, seconds]);
    return true;
  } catch (error) {
    console.error('Error setting expiration:', error);
    return false;
  }
}

/**
 * Get remaining TTL for a key
 * @param {string} key - The key to check
 * @returns {number} - Remaining seconds (-1 if no expiry, -2 if key doesn't exist)
 */
export async function getTimeToLive(key) {
  try {
    return await redisRequest(['TTL', key]);
  } catch (error) {
    console.error('Error getting TTL:', error);
    return -2;
  }
}

/**
 * Check if a key exists
 * @param {string} key - The key to check
 * @returns {boolean} - Whether the key exists
 */
export async function keyExists(key) {
  try {
    const result = await redisRequest(['EXISTS', key]);
    return result === 1;
  } catch (error) {
    console.error('Error checking key existence:', error);
    return false;
  }
}