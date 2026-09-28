import { defineField } from 'sanity'

/**
 * SEO/GEO fields shared by the events directory taxonomy documents
 * (category, country, city). Returns fresh definitions on each call so no
 * two document types share a field object.
 */
export function seoFields() {
  return [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optional. Overrides the auto-generated page title. Max 60 chars.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Optional. Overrides the auto-generated meta description. Max 160 chars.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      description: 'Shown at the top of the page. 2-3 sentences about this category, country or city.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      description: 'Optional. Shown at the bottom of the page and used for FAQPage schema.',
    }),
  ]
}
