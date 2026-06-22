// URL Shortening Service Integration
// Provides multiple ways to generate short shareable links

/**
 * Option 1: Using is.gd (Free, no API key required)
 * Shortest URLs, most reliable
 */
export const shortenUrlWithIsGd = async (longUrl) => {
  try {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    const data = await response.json();
    
    if (data.shorturl) {
      return data.shorturl;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error('Error shortening URL with is.gd:', error);
    return null;
  }
};

/**
 * Option 2: Using TinyURL (Free, no API key required)
 * Very reliable and widely used
 */
export const shortenUrlWithTinyURL = async (longUrl) => {
  try {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const shortUrl = await response.text();
    
    if (shortUrl && shortUrl.startsWith('https://')) {
      return shortUrl;
    }
    throw new Error('Invalid response');
  } catch (error) {
    console.error('Error shortening URL with TinyURL:', error);
    return null;
  }
};

/**
 * Option 3: Using v.gd (Free, very short URLs)
 */
export const shortenUrlWithVgd = async (longUrl) => {
  try {
    const response = await fetch(`https://v.gd/?format=json&url=${encodeURIComponent(longUrl)}`);
    const data = await response.json();
    
    if (data.short_url) {
      return data.short_url;
    }
    throw new Error(data.error || 'Unknown error');
  } catch (error) {
    console.error('Error shortening URL with v.gd:', error);
    return null;
  }
};

/**
 * Utility: Generate short link from bouquet data
 * Tries multiple services for reliability
 */
export const generateShortBouquetLink = async (bouquetData) => {
  // First encode the bouquet data
  const json = JSON.stringify(bouquetData);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const baseUrl = window.location.origin;
  const longUrl = `${baseUrl}/?b=${encoded}`;
  
  // Try is.gd first (usually fastest)
  let shortUrl = await shortenUrlWithIsGd(longUrl);
  if (shortUrl) return shortUrl;
  
  // Fall back to TinyURL
  shortUrl = await shortenUrlWithTinyURL(longUrl);
  if (shortUrl) return shortUrl;
  
  // Fall back to v.gd
  shortUrl = await shortenUrlWithVgd(longUrl);
  if (shortUrl) return shortUrl;
  
  // If all fail, return the shorter ?b= version as fallback
  console.warn('All shortening services failed, using fallback URL');
  return longUrl;
};

/**
 * Copy shortened link to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Generate both versions of the link
 */
export const generateShareLinks = async (bouquetData) => {
  const json = JSON.stringify(bouquetData);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const baseUrl = window.location.origin;
  
  const shortEncodedUrl = `${baseUrl}/?b=${encoded}`;
  const shortUrl = await generateShortBouquetLink(bouquetData);
  
  return {
    full: `${baseUrl}/?bouquet=${encoded}`,
    compact: shortEncodedUrl, // Using ?b= parameter (saves ~18 chars)
    shortened: shortUrl,       // Using URL shortening service (ultra-short)
    shortUrlLength: shortUrl?.length || 0,
    fullUrlLength: `${baseUrl}/?bouquet=${encoded}`.length
  };
};
