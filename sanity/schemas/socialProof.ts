import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialProof',
  title: 'Social Proof',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'Trusted by event teams at',
    }),
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Company Name', type: 'string' }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: false },
            }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'label' },
  },
})
