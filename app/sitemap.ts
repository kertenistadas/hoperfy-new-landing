import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageSlugsQuery, allPagesQuery, blogPostsQuery, blogCategoriesQuery } from '@/sanity/lib/queries'

const BASE_URL = 'https://hoperfy.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/hotels-for-events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/ticketing-for-events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const [legalPages, customPages, blogPosts, blogCategories] = await Promise.all([
    client
      .fetch<{ slug: string; lastUpdated?: string }[]>(legalPageSlugsQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string }[]>(allPagesQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string; publishedAt?: string }[]>(blogPostsQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string }[]>(blogCategoriesQuery)
      .catch(() => null),
  ])

  const legalRoutes: MetadataRoute.Sitemap = (legalPages ?? []).map((page) => ({
    url: `${BASE_URL}/legal/${page.slug}`,
    lastModified: page.lastUpdated ? new Date(page.lastUpdated) : now,
    changeFrequency: 'monthly',
    priority: 0.3,
  }))

  const customPageRoutes: MetadataRoute.Sitemap = (customPages ?? [])
    .filter((page) => page.slug)
    .map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const blogPostRoutes: MetadataRoute.Sitemap = (blogPosts ?? [])
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const blogCategoryRoutes: MetadataRoute.Sitemap = (blogCategories ?? [])
    .filter((category) => category.slug)
    .map((category) => ({
      url: `${BASE_URL}/blog/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  return [
    ...staticRoutes,
    ...legalRoutes,
    ...customPageRoutes,
    ...blogPostRoutes,
    ...blogCategoryRoutes,
  ]
}
