import type { EventFAQ } from '@/types'

/** FAQPage node for the JSON-LD @graph on directory taxonomy pages. */
export function buildFaqJsonLd(faqs: EventFAQ[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
