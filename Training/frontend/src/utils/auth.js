/**
 * Utility functions for handling JWT authentication tokens on the client side.
 */

/**
 * Decodes the payload section of a JWT token without external dependencies.
 * Handles Unicode and base64url characters cleanly.
 * 
 * @param {string} token - The raw JWT token string
 * @returns {object|null} The decoded JSON payload or null if invalid
 */
export function parseJwt(token) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT token:', error);
    return null;
  }
}

/**
 * Accessors for localStorage token persistence.
 */
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

/**
 * Extracts the user's email (stored in the 'sub' field) from the active token.
 * 
 * @returns {string|null} User email or null
 */
export const getActiveUserEmail = () => {
  const token = getToken();
  if (!token) return null;
  const decoded = parseJwt(token);
  return decoded ? decoded.sub : null;
};
