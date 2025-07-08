/**
 * URL parameters interface
 */
export interface UrlParams {
  data?: string
  order?: string
  marked?: string
}

/**
 * Gets URL parameters from the current URL
 * @returns Object with data, order, and marked parameters
 */
export function getParams(): UrlParams {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    return {
      data: urlParams.get('data') || undefined,
      order: urlParams.get('order') || undefined,
      marked: urlParams.get('marked') || undefined
    }
  } catch (error) {
    console.error('Error getting URL parameters:', error)
    return {}
  }
}

/**
 * Sets URL parameters silently (without page reload)
 * @param data Base64 encoded data
 * @param order Comma-separated order indexes
 * @param marked Comma-separated marked indexes
 */
export function setParams(data?: string, order?: string, marked?: string): void {
  try {
    const url = new URL(window.location.href)
    
    if (data) {
      url.searchParams.set('data', data)
    } else {
      url.searchParams.delete('data')
    }
    
    if (order) {
      url.searchParams.set('order', order)
    } else {
      url.searchParams.delete('order')
    }
    
    if (marked) {
      url.searchParams.set('marked', marked)
    } else {
      url.searchParams.delete('marked')
    }
    
    history.replaceState({}, '', url.toString())
  } catch (error) {
    console.error('Error setting URL parameters:', error)
  }
}

/**
 * Generates a shuffled order array for 24 items (0-23)
 * @returns Array of shuffled indexes
 */
export function shuffleOrder(): number[] {
  const order = Array.from({ length: 24 }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/**
 * Toggles a marked index in the marked array
 * @param index Index to toggle
 * @param marked Current array of marked indexes
 * @returns New array of marked indexes
 */
export function toggleMarked(index: number, marked: number[]): number[] {
  if (index === 12) return marked // Free space is always marked
  
  const newMarked = [...marked]
  const existingIndex = newMarked.indexOf(index)
  
  if (existingIndex > -1) {
    newMarked.splice(existingIndex, 1)
  } else {
    newMarked.push(index)
  }
  
  return newMarked.sort((a, b) => a - b)
}

/**
 * Parses comma-separated string to number array
 * @param str Comma-separated string
 * @returns Array of numbers
 */
export function parseCommaSeparated(str: string): number[] {
  if (!str) return []
  try {
    return str.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
  } catch (error) {
    console.error('Error parsing comma-separated string:', error)
    return []
  }
}

/**
 * Converts number array to comma-separated string
 * @param arr Array of numbers
 * @returns Comma-separated string
 */
export function toCommaSeparated(arr: number[]): string {
  return arr.join(',')
}

/**
 * Validates URL parameters
 * @param params URL parameters to validate
 * @returns Object with validation results
 */
export function validateParams(params: UrlParams): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (params.data && params.data.length > 10000) {
    errors.push('Data parameter is too large')
  }
  
  if (params.order) {
    const orderArray = parseCommaSeparated(params.order)
    if (orderArray.length !== 24) {
      errors.push('Order parameter must contain exactly 24 numbers')
    }
    if (orderArray.some(n => n < 0 || n > 23)) {
      errors.push('Order parameter contains invalid indexes')
    }
  }
  
  if (params.marked) {
    const markedArray = parseCommaSeparated(params.marked)
    if (markedArray.some(n => n < 0 || n > 24)) {
      errors.push('Marked parameter contains invalid indexes')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Creates a shareable URL with current parameters
 * @returns Current URL as string
 */
export function getShareableUrl(): string {
  return window.location.href
}

/**
 * Copies current URL to clipboard
 * @returns Promise that resolves when URL is copied
 */
export async function copyUrlToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch (error) {
    console.error('Error copying URL to clipboard:', error)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
} 