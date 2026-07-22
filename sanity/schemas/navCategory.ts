import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navCategory',
  title: 'Navigation Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Company", "Resources", "Solutions"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first in nav',
    }),
    defineField({
      name: 'pages',
      title: 'Pages in this category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }],
        },
      ],
      description: 'Select pages to appear under this dropdown category',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title' },
  },
})
