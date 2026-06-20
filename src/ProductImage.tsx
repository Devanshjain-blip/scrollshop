import { useState } from 'react'

type Props = {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
  lazy?: boolean
}

/** Image with an onError fallback that renders a branded placeholder showing the product name. */
export default function ProductImage({ src, alt, style, className, lazy = true }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 8,
          background: 'linear-gradient(135deg, #2a0a10 0%, #1a0306 100%)',
          color: 'var(--pink-deep)',
          fontSize: 12,
          fontWeight: 800,
          lineHeight: 1.2,
          overflow: 'hidden',
          ...style,
        }}
      >
        <span style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {alt}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      loading={lazy ? 'lazy' : undefined}
      onError={() => setError(true)}
    />
  )
}
