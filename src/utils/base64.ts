/**
 * Encodes an array of strings to base64
 * @param lines Array of strings to encode
 * @returns Base64 encoded string
 */
export function encodeLines(lines: string[]): string {
  try {
    const jsonString = JSON.stringify(lines)
    // Use TextEncoder for proper Unicode handling
    const encoder = new TextEncoder()
    const bytes = encoder.encode(jsonString)
    const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('')
    return btoa(binaryString)
  } catch (error) {
    console.error('Error encoding lines:', error)
    return ''
  }
}

/**
 * Decodes a base64 string to an array of strings
 * @param base64 Base64 encoded string
 * @returns Array of decoded strings
 */
export function decodeLines(base64: string): string[] {
  try {
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    const jsonString = decoder.decode(bytes)
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Error decoding base64:', error)
    return []
  }
} 