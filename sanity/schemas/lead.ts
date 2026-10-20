import { defineField, defineType } from 'sanity'

const attributionField = (name: string, title: string, type: 'string' | 'datetime' = 'string') =>
  defineField({ name, title, type, fieldset: 'attribution' })

export default defineType({
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fieldsets: [
    {
      name: 'attribution',
      title: 'Attribution',
      description:
        'Where this lead came from. First touch is the campaign that first brought them to the site, last touch is the campaign on the visit they converted. Captured automatically and may be empty when storage is blocked.',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Optional — some leads (e.g. the hotels event form) are saved before an email is collected.',
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
          { title: 'Speaker housing', value: 'speaker-housing' },
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
    defineField({ name: 'eventStartDate', title: 'Event Start Date', type: 'string' }),
    defineField({ name: 'eventEndDate', title: 'Event End Date', type: 'string' }),
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

    // Attribution. All optional: a lead is never blocked by missing values.
    attributionField('firstSource', 'First source'),
    attributionField('firstMedium', 'First medium'),
    attributionField('firstCampaign', 'First campaign'),
    attributionField('firstTerm', 'First term'),
    attributionField('firstContent', 'First content'),
    attributionField('firstReferrer', 'First referrer'),
    attributionField('firstLandingPage', 'First landing page'),
    attributionField('firstTouchAt', 'First touch at', 'datetime'),

    attributionField('lastSource', 'Last source'),
    attributionField('lastMedium', 'Last medium'),
    attributionField('lastCampaign', 'Last campaign'),
    attributionField('lastTerm', 'Last term'),
    attributionField('lastContent', 'Last content'),
    attributionField('lastReferrer', 'Last referrer'),
    attributionField('lastTouchAt', 'Last touch at', 'datetime'),

    attributionField('gclid', 'Google click id'),
    attributionField('fbclid', 'Facebook click id'),
    attributionField('liFatId', 'LinkedIn click id'),
    attributionField('gaClientId', 'GA client id'),

    attributionField('submittedPath', 'Submitted from path'),
    attributionField('deviceType', 'Device type'),
    attributionField('userAgent', 'User agent'),
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
