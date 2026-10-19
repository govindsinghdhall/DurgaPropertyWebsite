/**
 * Selects the primary image from a property's images array based on the following rules:
 * 1. Select the first image with `isPrimary === true`
 * 2. If no primary image exists, select the first image with a valid URL
 * 3. If no valid image exists, return undefined
 */
export function selectPrimaryImage(images: { isPrimary: boolean; url: string }[] = []): { isPrimary: boolean; url: string } | undefined {
  // Rule 1: Find first image with isPrimary === true
  const primaryImage = images.find((img) => img.isPrimary)
  if (primaryImage && isValidImageUrl(primaryImage.url)) {
    return primaryImage
  }

  // Rule 2: Find first image with a valid URL
  const firstValidImage = images.find((img) => isValidImageUrl(img.url))
  if (firstValidImage) {
    return firstValidImage
  }

  // Rule 3: No valid image found
  return undefined
}

/**
 * Validates if an image URL is usable
 */
function isValidImageUrl(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmedUrl = url.trim()
  return trimmedUrl.length > 0 && 
         (trimmedUrl.startsWith('http') || 
          trimmedUrl.startsWith('/'))
}