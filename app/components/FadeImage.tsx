import React from 'react'

interface FadeImageProps {
  src: string
  alt?: string
  className?: string
  fadeColor?: string
  fadeHeight?: string
}

const FadeImage = ({
  src,
  alt = '',
  className = '',
  fadeColor = '#020617',
  fadeHeight = '60%',
}: FadeImageProps) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: fadeHeight,
          background: `linear-gradient(to bottom, transparent 0%, ${fadeColor} 100%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default FadeImage