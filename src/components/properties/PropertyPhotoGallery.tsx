
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PropertyImage } from '@/types'
import { resolvePropertyImageSrc } from '@/utils/propertyImages'

interface PropertyPhotoGalleryProps {
  images: PropertyImage[]
  title: string
  onClose: () => void
}

export function PropertyPhotoGallery({
  images,
  title,
  onClose,
}: PropertyPhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Keep the primary image first without mutating the original array.
  const sortedImages = useMemo(() => {
    return images
      .map((image, originalIndex) => ({ image, originalIndex }))
      .sort((a, b) => {
        if (a.image.isPrimary && !b.image.isPrimary) return -1
        if (!a.image.isPrimary && b.image.isPrimary) return 1
        return a.originalIndex - b.originalIndex
      })
      .map(({ image }) => image)
  }, [images])

  // Keep the index valid when the image collection changes.
  useEffect(() => {
    setCurrentIndex((index) =>
      sortedImages.length === 0
        ? 0
        : Math.min(index, sortedImages.length - 1),
    )
  }, [sortedImages.length])

  const currentImage = sortedImages[currentIndex]
  const imageUrl = currentImage?.url
    ? resolvePropertyImageSrc(currentImage.url)
    : undefined

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handlePrev = useCallback(() => {
    setCurrentIndex((index) =>
      index > 0 ? index - 1 : sortedImages.length - 1,
    )
  }, [sortedImages.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((index) =>
      index < sortedImages.length - 1 ? index + 1 : 0,
    )
  }, [sortedImages.length])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (sortedImages.length <= 1) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNext()
      }
    },
    [handleClose, handleNext, handlePrev, sortedImages.length],
  )

  // Register keyboard controls only while this gallery is mounted.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent background scrolling while the modal is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Reset loading and error states whenever the selected image changes.
  useEffect(() => {
    setIsLoading(Boolean(imageUrl))
    setImageError(!imageUrl)
  }, [imageUrl])

  const handleImageLoad = () => {
    setIsLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  if (sortedImages.length === 0) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} photo gallery`}
        className="relative flex max-h-[95dvh] w-full max-w-6xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-0 top-0 z-20 flex h-10 w-10 -translate-y-12 items-center justify-center rounded-full bg-black/60 text-3xl text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-translate-y-0 sm:translate-x-12"
          onClick={handleClose}
          aria-label="Close gallery"
          autoFocus
        >
          &times;
        </button>

        {/* Main image */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-slate-950">
          {imageUrl && (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`${title} - Photo ${currentIndex + 1}`}
              className={`max-h-[65dvh] w-full object-contain transition-opacity duration-200 ${
                isLoading || imageError ? 'opacity-0' : 'opacity-100'
              }`}
              loading="eager"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              role="status"
              aria-label="Loading image"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>
          )}

          {imageError && (
            <div
              className="absolute inset-0 flex items-center justify-center px-4 text-center text-white"
              role="status"
            >
              Image not available
            </div>
          )}

          {/* Image counter */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white">
            {currentIndex + 1} of {sortedImages.length}
          </div>

          {/* Previous photo */}
          {sortedImages.length > 1 && (
            <button
              type="button"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next photo */}
          {sortedImages.length > 1 && (
            <button
              type="button"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        {sortedImages.length > 1 && (
          <div
            className="mt-3 flex shrink-0 gap-2 overflow-x-auto overscroll-x-contain pb-2"
            aria-label="Photo thumbnails"
          >
            {sortedImages.map((image, index) => {
              const thumbnailUrl = image.url
                ? resolvePropertyImageSrc(image.url)
                : undefined

              return (
                <button
                  key={`${image.url ?? 'image'}-${index}`}
                  type="button"
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    index === currentIndex
                      ? 'border-white ring-2 ring-white/40'
                      : 'border-transparent opacity-70 hover:border-white/60 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                >
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-slate-800 px-1 text-xs text-white">
                      No image
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}