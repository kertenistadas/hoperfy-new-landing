import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerCategory',
  title: 'Footer Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Products", "Company", "Legal"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first (left to right)',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'string', description: 'Internal: /products or External: https://...' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title' },
  },
})
