import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'The URL path e.g. "about" becomes hoperfy.com/about',
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Footer link', value: 'footer' },
          { title: 'Navigation menu', value: 'nav' },
          { title: 'Landing page section', value: 'landing' },
        ],
      },
      description: 'Where should this page appear as a link or section?',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({ name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false }),
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
