import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Event Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
    defineField({ name: 'city', title: 'City', type: 'reference', to: [{ type: 'eventCity' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'eventCategory' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'website', title: 'Website URL', type: 'url' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string', description: 'Optional' }),
    defineField({ name: 'attendees', title: 'Expected Attendees', type: 'number', description: 'Optional' }),
    defineField({ name: 'ticketPriceFrom', title: 'Ticket Price From', type: 'string', description: 'Optional, e.g. €199' }),
    defineField({ name: 'organizer', title: 'Organizer', type: 'string', description: 'Optional' }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'In-person', value: 'in-person' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Virtual', value: 'virtual' },
        ],
      },
      initialValue: 'in-person',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
      description:
        'SEO description shown on the event page. Aim for 150-250 words. Covers what the event is, where and when, who attends, and why it matters.',
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: false }, description: 'Optional' }),
  ],
  orderings: [{ title: 'Start date', name: 'startDateAsc', by: [{ field: 'startDate', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'startDate', media: 'logo' } },
})
