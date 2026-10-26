import { defineArrayMember, defineField } from 'sanity'

/**
 * Portable Text members for long-form bodies (blog posts, comparisons).
 * Returns fresh definitions on each call so no two document types share a
 * field object.
 */
export function blogBodyMembers() {
  return [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'string',
                title: 'URL',
                description: 'Internal: /products/hotels-for-events or External: https://...',
              }),
              defineField({
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      // Alt and caption alone make the block non-empty, so required() would pass it.
      validation: (Rule) =>
        Rule.custom((value: { asset?: unknown } | undefined) =>
          value?.asset ? true : 'Upload an image file',
        ),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe what the image shows. Screen readers and search engines read this.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
  ]
}
