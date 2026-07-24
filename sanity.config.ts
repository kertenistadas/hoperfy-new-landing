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
            S.documentTypeListItem('lead').title('Leads'),
            S.divider(),
            S.listItem()
              .title('Hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.divider(),
            S.listItem()
              .title('Pricing')
              .child(S.documentTypeList('pricing').title('Pricing')),
            S.divider(),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('socialProof').title('Social Proof'),
            S.divider(),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
            S.divider(),
            S.documentTypeListItem('page').title('Custom Pages'),
            S.divider(),
            S.documentTypeListItem('blogCategory').title('Blog Categories'),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.divider(),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.divider(),
            S.documentTypeListItem('navCategory').title('Navigation Categories'),
            S.divider(),
            S.documentTypeListItem('footerCategory').title('Footer Categories'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})