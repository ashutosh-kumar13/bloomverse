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

// Generate shareable link
export const generateShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?bouquet=${encoded}`;
};

// Get bouquet data from current URL
export const getBouquetFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('bouquet');
  if (encoded) {
    return decodeBouquetData(encoded);
  }
  return null;
};
