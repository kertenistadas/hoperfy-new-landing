import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "Free", "2.5%", "€499"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceSuffix',
      title: 'Price Suffix',
      type: 'string',
      description: 'e.g. "per ticket", "per event", "forever"',
    }),
    defineField({
      name: 'tagline',
      title: 'Pricing Tagline',
      type: 'string',
      description: 'e.g. "We set it up. You keep 100% of the revenue."',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      initialValue: false,
      description: 'Show this card with a blue border and accent',
    }),
    defineField({
      name: 'includes',
      title: 'What is included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Feature list shown on pricing card',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Get started',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'product.title',
      subtitle: 'price',
    },
  },
})
