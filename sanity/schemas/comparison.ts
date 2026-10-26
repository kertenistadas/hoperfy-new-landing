import { defineArrayMember, defineField, defineType } from 'sanity'
import { blogBodyMembers } from './shared/blogBody'

const TABLE_TYPES = ['head-to-head', 'alternatives']

export default defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'The URL path, e.g. "hoperfy-vs-eventbrite" becomes hoperfy.com/compare/hoperfy-vs-eventbrite',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description: 'Overrides the title in search results (60 chars max)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Shown in search results (160 chars max)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'comparisonType',
      title: 'Comparison type',
      type: 'string',
      options: {
        list: [
          { title: 'Head to head', value: 'head-to-head' },
          { title: 'Alternatives', value: 'alternatives' },
          { title: 'Category', value: 'category' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Optional. Set when the comparison is materially revised.',
    }),
    defineField({
      name: 'lastVerified',
      title: 'Last verified',
      type: 'date',
      description: 'The date competitor facts were last checked. Shown on the page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      description: 'The direct answer, in two or three sentences. Shown first on the page.',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key takeaways',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.min(3).max(6),
      description:
        'Three to five self-contained facts. Each must make sense read on its own, without the article around it: include the noun and the number, avoid "it", "this" and "they". 15 to 25 words each.',
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Comparison table',
      type: 'object',
      description: 'Required for head to head and alternatives comparisons.',
      validation: (Rule) =>
        Rule.custom((value: { columns?: string[]; rows?: { cells?: string[] }[] } | undefined, context) => {
          const type = (context.document as { comparisonType?: string } | undefined)?.comparisonType
          const empty = !value?.columns?.length || !value?.rows?.length
          if (type && TABLE_TYPES.includes(type) && empty) {
            return 'Add columns and at least one row: this comparison type needs a table'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'Column headings, left to right. The first column holds the row labels. Name one column "Hoperfy" to highlight it.',
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'comparisonRow',
              title: 'Row',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [defineArrayMember({ type: 'string' })],
                  description: 'One cell per column, in the same order. The first cell is the row label.',
                  validation: (Rule) =>
                    Rule.custom((cells: string[] | undefined, context) => {
                      const columns = (context.document as { comparisonTable?: { columns?: string[] } } | undefined)
                        ?.comparisonTable?.columns
                      if (!cells?.length || !columns?.length || cells.length === columns.length) return true
                      return `This row has ${cells.length} cells but the table has ${columns.length} columns`
                    }),
                }),
              ],
              preview: {
                select: { cells: 'cells' },
                prepare: ({ cells }: { cells?: string[] }) => ({
                  title: cells?.[0] || 'Empty row',
                  subtitle: cells?.slice(1).join(' | '),
                }),
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: blogBodyMembers(),
      description: 'Links to other websites are not shown on the page. Use internal links, e.g. /products/ticketing-for-events.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'comparisonFaq',
          title: 'FAQ',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),
    defineField({
      name: 'relatedProduct',
      title: 'Related product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The product page that links to this comparison under its comparison table.',
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'comparisonType' },
  },
})
