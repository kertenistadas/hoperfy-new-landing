import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    // SEO fields
    defineField({ name: 'title', title: 'H1 Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', description: '60 chars max — shown in Google results', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, description: '150-160 chars — shown in Google results', validation: (Rule) => Rule.max(160) }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),

    // Client info
    defineField({ name: 'clientName', title: 'Client Name', type: 'string' }),
    defineField({ name: 'clientWebsite', title: 'Client Website URL', type: 'url' }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: false, accept: 'image/svg+xml,image/png,image/jpeg,image/webp,image/*' },
    }),
    defineField({ name: 'industry', title: 'Industry', type: 'string', description: 'e.g. "Tech Conference", "Sports Event"' }),
    defineField({ name: 'eventSize', title: 'Event Size', type: 'string', description: 'e.g. "2,000 attendees"' }),
    defineField({
      name: 'productsUsed',
      title: 'Hoperfy Products Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hotels for Events', value: 'hotels' },
          { title: 'Ticketing for Events', value: 'ticketing' },
          { title: 'Both', value: 'both' },
        ],
      },
    }),

    // Key results - shown as stat boxes
    defineField({
      name: 'keyResults',
      title: 'Key Results',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "20 hrs"' }),
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "saved on hotel logistics"' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
      description: 'Up to 3 stat boxes shown at the top of the case study',
      validation: (Rule) => Rule.max(3),
    }),

    // Content sections
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4, description: 'Hook paragraph — lead with the result' }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'What the client struggled with before Hoperfy',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'What Hoperfy did and how fast',
    }),
    defineField({
      name: 'result',
      title: 'The Result',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The measurable outcome',
    }),
    defineField({
      name: 'quote',
      title: 'Client Quote',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 3 }),
        defineField({ name: 'author', title: 'Author Name', type: 'string' }),
        defineField({ name: 'role', title: 'Author Role', type: 'string' }),
      ],
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
      rows: 4,
      description: 'Plain-language explanation for AI summarization and GEO',
    }),

    // Related content
    defineField({
      name: 'relatedProduct',
      title: 'Related Product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'title' },
  },
})
