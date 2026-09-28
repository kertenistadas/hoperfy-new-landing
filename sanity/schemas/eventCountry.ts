import { defineField, defineType } from 'sanity'
import { seoFields } from './shared/seoFields'

export default defineType({
  name: 'eventCountry',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Country Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Optional. One paragraph about the events scene in this country.' }),
    ...seoFields(),
  ],
  preview: { select: { title: 'name' } },
})
