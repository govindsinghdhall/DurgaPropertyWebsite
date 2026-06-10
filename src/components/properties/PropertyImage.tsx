import { useState, useCallback, useEffect, useRef } from 'react'
import { getPlaceholderForType, getSvgPlaceholder, resolvePropertyImageSrc } from '@/utils/propertyImages'

interface PropertyImageProps {
  src?: string | null
  alt: string
  propertyType?: string | null
  luxury?: boolean
  className?: string
  priority?: boolean
}

export function PropertyImage({
  src,
  alt,
  propertyType,
  luxury,
  className = '',
  priority = false,
}: PropertyImageProps) {
  const placeholder = getPlaceholderForType(propertyType, luxury)
  const svgFallback = getSvgPlaceholder(propertyType, luxury)
  const resolved = src?.trim() ? resolvePropertyImageSrc(src, propertyType, luxury) : placeholder

  const [imgSrc, setImgSrc] = useState(resolved)
  const [loaded, setLoaded] = useState(false)
  const fallbackStep = useRef(0)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const next = src?.trim() ? resolvePropertyImageSrc(src, propertyType, luxury) : placeholder
    fallbackStep.current = 0
    setImgSrc(next)
    setLoaded(false)
  }, [src, propertyType, luxury, placeholder])

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [imgSrc])

  const handleError = useCallback(() => {
    if (fallbackStep.current === 0) {
      fallbackStep.current = 1
      setImgSrc(placeholder)
      setLoaded(false)
      return
    }
    if (fallbackStep.current === 1) {
      fallbackStep.current = 2
      setImgSrc(svgFallback)
      setLoaded(true)
    }
  }, [placeholder, svgFallback])

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div className={`property-image-frame ${className}`}>
      {!loaded && <div className="property-image-skeleton" aria-hidden />}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`property-image ${loaded ? 'property-image--loaded' : ''}`}
      />
    </div>
  )
}
