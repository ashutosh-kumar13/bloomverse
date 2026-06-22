// Simple LZ compression for better compression ratio
const lzCompress = (str) => {
  const dict = {};
  const data = str.split('');
  let currChar = '';
  let phrase = data[0];
  let code = 256;
  
  for (let i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar]) {
      phrase += currChar;
    } else {
      dict[phrase + currChar] = code;
      code++;
      phrase += currChar;
      phrase = currChar;
    }
  }
  return phrase;
};

// Encode bouquet data into a URL-safe string
export const encodeBouquetData = (data) => {
  const json = JSON.stringify(data);
  // Convert to base64 with UTF-8 support
  return btoa(unescape(encodeURIComponent(json)));
};

// Decode bouquet data from URL string
export const decodeBouquetData = (encoded) => {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch (error) {
    console.error('Failed to decode bouquet data:', error);
    return null;
  }
};

// Create a compact hash from bouquet data for shorter URLs
export const createCompactHash = (bouquetData) => {
  const flowers = bouquetData.flowers || [];
  const layout = bouquetData.layout || 'classic';
  const message = bouquetData.message || '';
  const senderName = bouquetData.senderName || '';
  const recipientName = bouquetData.recipientName || '';
  
  // Map flower names to short codes
  const flowerCodes = {
    rose: 'r', peony: 'p', tulip: 't', lily: 'l', 
    lavender: 'v', sunflower: 's', orchid: 'o'
  };
  
  const layoutCodes = { classic: 'c', diamond: 'd', circular: 'x' };
  
  const flowerString = flowers.map(f => flowerCodes[f] || '?').join('');
  const hash = `${flowerString}${layoutCodes[layout] || 'c'}`;
  
  // Add optional data if needed
  const optional = {
    m: message.substring(0, 50),
    s: senderName.substring(0, 20),
    r: recipientName.substring(0, 20),
  };
  
  return { hash, optional };
};

// Generate shareable link
export const generateShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?bouquet=${encoded}`;
};

// Generate shortened shareable link
export const generateShortShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  // Shorter parameter name for shorter URL
  return `${baseUrl}/?b=${encoded}`;
};

// Get bouquet data from current URL
export const getBouquetFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let encoded = params.get('bouquet') || params.get('b');
  if (encoded) {
    return decodeBouquetData(encoded);
  }
  return null;
};
