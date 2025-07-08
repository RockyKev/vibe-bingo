/**
 * Encodes an array of strings to base64
 * @param lines Array of strings to encode
 * @returns Base64 encoded string
 */
export function encodeLines(lines: string[]): string {
  const jsonString = JSON.stringify(lines)
  return btoa(jsonString)
}

/**
 * Decodes a base64 string to an array of strings
 * @param base64 Base64 encoded string
 * @returns Array of decoded strings
 */
export function decodeLines(base64: string): string[] {
  try {
    const jsonString = atob(base64)
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Error decoding base64:', error)
    return []
  }
} 