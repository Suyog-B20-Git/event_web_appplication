/**
 * Normalizes image URLs to fix common issues:
 * - Duplicate domains in pathname
 * - Protocol issues (http:/ or https:/)
 * - Multiple slashes
 * - Backslashes
 * 
 * @param {string} url - The URL to normalize
 * @returns {string} - The normalized URL
 */
export function normalizeImageUrl(url) {
  if (!url) return null;
  
  let normalizedUrl = url.replace(/\\/g, "/");
  
  // Fix protocol issues (http:/ or https:/ -> http:// or https://)
  normalizedUrl = normalizedUrl.replace(/^(https?):\/(?!\/)/, "$1://");
  
  // If URL already starts with http:// or https://, it's an absolute URL
  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")) {
    try {
      const urlObj = new URL(normalizedUrl);
      const hostname = urlObj.hostname;
      const pathname = urlObj.pathname;
      
      // Check if pathname starts with the same domain (duplicate domain issue)
      // e.g., /dev.eventsnode.com/... should be removed
      const domainInPath = `/${hostname}/`;
      if (pathname.startsWith(domainInPath)) {
        // Remove the duplicate domain from pathname
        urlObj.pathname = pathname.replace(domainInPath, "/");
        normalizedUrl = urlObj.toString();
      }
    } catch (e) {
      // If URL parsing fails, just return the original with normalized slashes
      normalizedUrl = normalizedUrl.replace(/\/{2,}/g, "/");
    }
    return normalizedUrl;
  }
  
  // For relative paths, normalize slashes
  normalizedUrl = normalizedUrl.replace(/\/{2,}/g, "/");
  // Ensure it starts with a single slash if it's a relative path
  if (!normalizedUrl.startsWith("/") && !normalizedUrl.startsWith("http")) {
    normalizedUrl = "/" + normalizedUrl;
  }
  
  return normalizedUrl;
}






