import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'hoperfy',
  title: 'Hoperfy CMS',

  projectId: '2p72wli5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.divider(),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('socialProof').title('Social Proof'),
            S.divider(),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})