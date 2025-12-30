/**
 * LocalStorage utility functions for data persistence
 * 
 * localStorage is generally the better option over sessionStorage when you need
 * data to persist across browser sessions (i.e., after the browser is closed and reopened).
 */

/**
 * Saves data to localStorage with optional expiration
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store (will be JSON stringified)
 * @param {number} expiryDays - Optional number of days until data expires
 */
export function saveToStorage(key, data, expiryDays = null) {
  try {
    // Create storage object
    const storageItem = {
      data: data,
      timestamp: new Date().getTime()
    };
    
    // Add expiration if specified
    if (expiryDays !== null) {
      storageItem.expiry = new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000);
    }
    
    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(storageItem));
    // return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

export function saveSettings(key, data, expiryDays = null) {
  try {
    // Create storage object
    const storageItem = {
      data: data,
      timestamp: new Date().getTime()
    };
    
    // Add expiration if specified
    if (expiryDays !== null) {
      storageItem.expiry = new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000);
    }
    
    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(storageItem));
    // return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

export function saveImageToStorage(key, imageFiles, expiryDays = 7) {
  try {
    // Convert image files to base64
    const base64Images = [];

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    // Helper function to generate unique filename with timestamp
    const generateUniqueFilename = (originalName) => {
      const timestamp = new Date().getTime();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const extension = originalName.includes('.') ? originalName.split('.').pop() : 'jpg';
      const baseName = originalName.includes('.') ? originalName.split('.').slice(0, -1).join('.') : originalName;
      return `${baseName}_${timestamp}_${randomSuffix}.${extension}`;
    };

    // If imageFiles is an array of file paths from the server
    if (typeof imageFiles[0] === 'string') {
      // Fetch and convert server images to base64
      const fetchImagePromises = imageFiles.map(async (imagePath, index) => {
        try {
          const response = await fetch(`http://localhost:8000/extract-images/${imagePath}`);
          const blob = await response.blob();
          const base64Data = await convertToBase64(blob);
          
          // Generate unique filename for this image
          const originalName = imagePath.split('/').pop() || `image_${index}`;
          const uniqueName = generateUniqueFilename(originalName);
          
          return {
            name: uniqueName,
            data: base64Data,
            originalName: imagePath,
            addedAt: new Date().toISOString()
          };
        } catch (error) {
          console.error('Error fetching image:', error);
          return null;
        }
      });

      Promise.all(fetchImagePromises)
        .then((base64Results) => {
          // Filter out any null results
          const validBase64Images = base64Results.filter(img => img !== null);
          
          // Create storage item with base64 images and metadata
          const storageItem = {
            data: validBase64Images,
            timestamp: new Date().getTime(),
            expiry: expiryDays ? new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000) : null,
            totalImages: validBase64Images.length
          };

          // Store in localStorage
          localStorage.setItem(key, JSON.stringify(storageItem));
        })
        .catch(error => {
          console.error('Error converting images:', error);
        });
    } 
    // If imageFiles is already a File object or Blob
    else {
      const convertFilesToBase64 = async () => {
        const base64Promises = imageFiles.map(async (file, index) => {
          const base64Data = await convertToBase64(file);
          
          // Generate unique filename for this file
          const originalName = file.name || `image_${index}`;
          const uniqueName = generateUniqueFilename(originalName);
          
          return {
            name: uniqueName,
            data: base64Data,
            originalName: originalName,
            addedAt: new Date().toISOString(),
            size: file.size,
            type: file.type
          };
        });
        
        const base64Results = await Promise.all(base64Promises);

        const storageItem = {
          data: base64Results,
          timestamp: new Date().getTime(),
          expiry: expiryDays ? new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000) : null,
          totalImages: base64Results.length
        };

        localStorage.setItem(key, JSON.stringify(storageItem));
      };

      convertFilesToBase64();
    }

    return true;
  } catch (error) {
    console.error('Error saving images to localStorage:', error);
    return false;
  }
}


/**
 * Retrieves data from localStorage, checking for expiration
 * @param {string} key - The key to retrieve data for
 * @returns {any|null} - The stored data or null if not found or expired
 */
export function getFromStorage(key) {
  try {
    // Get stored item
    const storedItem = localStorage.getItem(key);
    if (!storedItem) return null;
    
    // Parse the stored data
    const storageItem = JSON.parse(storedItem);
    
    // Check if expired
    if (storageItem.expiry && storageItem.expiry < new Date().getTime()) {
      localStorage.removeItem(key); // Clean up expired item
      return null;
    }
    
    return storageItem.data;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
}

/**
 * Removes data from localStorage
 * @param {string} key - The key to remove
 */
export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

/**
 * Clears all app data from localStorage
 * @param {string} prefix - Optional prefix to limit clearing to specific keys
 */
export function clearStorage(prefix = '') {
  if (prefix) {
    // Remove only items with the specified prefix
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
  } else {
    // Clear all localStorage
    localStorage.clear();
  }
}

/**
 * Checks if localStorage is available and working
 * @returns {boolean} - Whether localStorage is available
 */
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}