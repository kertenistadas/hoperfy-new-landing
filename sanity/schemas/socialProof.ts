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
              options: {
                hotspot: false,
                accept: 'image/svg+xml,image/png,image/jpeg,image/webp,image/*'
              },
              description: 'SVG, PNG, JPG or WEBP — any format accepted',
            }),
            defineField({
              name: 'caseStudyUrl',
              title: 'Case Study URL',
              type: 'string',
              description:
                'Optional. Point to a Custom Page created in Sanity with a /resources/ prefix, e.g. /resources/techbbq-case-study — if set, the logo becomes clickable with a "Read case study" tag.',
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
