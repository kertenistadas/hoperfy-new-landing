'use client'

import Image, { type ImageLoader } from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type Crop = { top: number; bottom: number; left: number; right: number }

export type BodyImageValue = {
  asset?: { _ref?: string }
  crop?: Crop
  hotspot?: unknown
  alt?: string
  caption?: string
}

// The article column is max-w-2xl (672px) inside px-6 gutters.
const SIZES = '(min-width: 720px) 672px, calc(100vw - 48px)'

/** Intrinsic size from the asset id (image-<hash>-<w>x<h>-<ext>), adjusted for any crop. */
function dimensions(value: BodyImageValue) {
  const match = value.asset?._ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/)
  if (!match) return null
  const [w, h] = [Number(match[1]), Number(match[2])]
  const crop = value.crop
  if (!crop) return { width: w, height: h }
  return {
    width: Math.round(w * (1 - crop.left - crop.right)),
    height: Math.round(h * (1 - crop.top - crop.bottom)),
  }
}

/** Inline image in an article body. Sanity's CDN resizes to each srcset width. */
export default function BlogImage({ value }: { value: BodyImageValue }) {
  const size = dimensions(value)
  if (!value.asset || !size) return null

  const loader: ImageLoader = ({ width, quality }) =>
    urlFor(value).width(width).quality(quality ?? 75).fit('max').auto('format').url()

  const caption = value.caption?.trim()

  return (
    <figure className="my-10">
      <Image
        loader={loader}
        src={urlFor(value).url()}
        alt={value.alt ?? ''}
        width={size.width}
        height={size.height}
        sizes={SIZES}
        loading="lazy"
        // .prose-blog img sets an unlayered margin that would beat utility classes.
        className="m-0! w-full h-auto rounded-xl"
      />
      {caption && (
        <figcaption className="text-sm font-light text-[#6b7280] mt-3">{caption}</figcaption>
      )}
    </figure>
  )
}
