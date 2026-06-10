import { useEffect, useMemo, useState } from 'react'
import type { PropertyImage as PropertyImageType } from '@/types'
import { resolvePropertyImageSrc, getSvgPlaceholder } from '@/utils/propertyImages'
import { PropertyImage } from './PropertyImage'

interface PropertyGalleryProps {
  images: PropertyImageType[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const sortedImages = useMemo(() => {
    if (!images.length) return []
    const primary = images.find((img) => img.isPrimary)
    const rest = images.filter((img) => img.id !== primary?.id)
    return primary ? [primary, ...rest] : images
  }, [images])

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const activeImage = sortedImages[activeIndex]

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') setActiveIndex((i) => Math.min(i + 1, sortedImages.length - 1))
      if (event.key === 'ArrowLeft') setActiveIndex((i) => Math.max(i - 1, 0))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, sortedImages.length])

  if (!sortedImages.length) {
    return (
      <div className="overflow-hidden rounded-2xl">
        <PropertyImage src={null} alt={title} priority />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative w-full overflow-hidden rounded-2xl bg-slate-100"
        >
          <PropertyImage src={activeImage?.url} alt={title} priority />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {sortedImages.length} photo{sortedImages.length > 1 ? 's' : ''} · Click to expand
          </span>
        </button>

        {sortedImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-xl border-2 transition ${
                  activeIndex === index
                    ? 'border-brand-500 ring-2 ring-brand-100'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img
                  src={resolvePropertyImageSrc(image.url)}
                  alt={`${title} photo ${index + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = getSvgPlaceholder() }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20"
          >
            Close
          </button>

          {sortedImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveIndex((i) => Math.max(i - 1, 0))
                }}
                disabled={activeIndex === 0}
                className="absolute left-4 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveIndex((i) => Math.min(i + 1, sortedImages.length - 1))
                }}
                disabled={activeIndex === sortedImages.length - 1}
                className="absolute right-4 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 disabled:opacity-30"
              >
                ›
              </button>
            </>
          )}

          <div className="max-h-[85vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={resolvePropertyImageSrc(activeImage.url)}
              alt={title}
              className="max-h-[80vh] w-full rounded-xl object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = getSvgPlaceholder() }}
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {activeIndex + 1} of {sortedImages.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
