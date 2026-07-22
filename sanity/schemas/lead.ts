import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productInterest',
      title: 'Product Interest',
      type: 'string',
      options: {
        list: [
          { title: 'Tickets only', value: 'tickets' },
          { title: 'Hotels only', value: 'hotels' },
          { title: 'Both tickets and hotels', value: 'both' },
        ],
      },
    }),
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
    }),
    defineField({
      name: 'attendees',
      title: 'Expected Attendees',
      type: 'string',
      options: {
        list: [
          { title: 'Under 200', value: 'under-200' },
          { title: '200–500', value: '200-500' },
          { title: '500–2000', value: '500-2000' },
          { title: '2000+', value: '2000+' },
        ],
      },
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Event Location',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Converted', value: 'converted' },
          { title: 'Not a fit', value: 'not-a-fit' },
        ],
      },
    }),
    defineField({
      name: 'source',
      title: 'Source page',
      type: 'string',
      description: 'Which page did they sign up from',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
    },
  },
})
