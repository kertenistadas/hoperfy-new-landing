import { defineField, defineType } from 'sanity'
import { seoFields } from './shared/seoFields'

export default defineType({
  name: 'eventCity',
  title: 'City',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'City Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'country', title: 'Country', type: 'reference', to: [{ type: 'eventCountry' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, description: 'Optional. One paragraph about this city as an events destination.' }),
    ...seoFields(),
  ],
  preview: { select: { title: 'name', subtitle: 'country.name' } },
})
