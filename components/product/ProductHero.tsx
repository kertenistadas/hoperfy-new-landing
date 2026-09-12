import type { ProductDetail, SocialProof } from '@/types'
import CTAButtons from '@/components/CTAButtons'
import SpeakerHousingCTA from './speaker-housing/SpeakerHousingCTA'
import SpeakerHousingLogoBar from './speaker-housing/SpeakerHousingLogoBar'

type Props = {
  product: ProductDetail
  socialProof?: SocialProof | null
}

export default function ProductHero({ product, socialProof }: Props) {
  const isSpeakerHousing = product.slug === 'speaker-housing'

  return (
    <>
      <section className={`px-6 ${isSpeakerHousing ? 'pt-24 pb-12' : 'pt-32 pb-24'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-6">{product.tagline}</p>

          <h1
            className={`font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6 ${
              isSpeakerHousing
                ? 'text-[2.25rem] md:text-[2.75rem]'
                : 'text-[2.75rem] md:text-[3.5rem]'
            }`}
          >
            {product.heroHeadline}
          </h1>

          <p
            className={`text-lg font-light text-[#6b7280] leading-relaxed mx-auto ${
              isSpeakerHousing ? 'mb-8 max-w-2xl' : 'mb-12 max-w-xl'
            }`}
          >
            {product.heroSubtitle}
          </p>

          <div id="signup">
            {isSpeakerHousing ? (
              <SpeakerHousingCTA />
            ) : (
              <CTAButtons source={product.slug} />
            )}

            <p className="mt-4 text-[12px] text-[#9ca3af]">
              No commitment required.
            </p>
          </div>
        </div>
      </section>

      {isSpeakerHousing && socialProof && <SpeakerHousingLogoBar data={socialProof} />}
    </>
  )
}
