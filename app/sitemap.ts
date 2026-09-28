import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageSlugsQuery, allPagesQuery, blogPostsQuery, blogCategoriesQuery, caseStudiesQuery, allEventsQuery, eventCountriesQuery, eventCitiesQuery, eventCategoriesQuery } from '@/sanity/lib/queries'
import { getCutoffDate, isExpiredEvent } from '@/lib/eventUtils'

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
      url: `${BASE_URL}/products/speaker-housing`,
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
    {
      url: `${BASE_URL}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const [legalPages, customPages, blogPosts, blogCategories, caseStudies, events, eventCountries, eventCities, eventCategories] = await Promise.all([
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
    client
      .fetch<{ slug: string; publishedAt?: string }[]>(caseStudiesQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string; startDate: string; endDate?: string }[]>(allEventsQuery, { cutoff: getCutoffDate() })
      .catch(() => null),
    client
      .fetch<{ slug: string }[]>(eventCountriesQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string }[]>(eventCitiesQuery)
      .catch(() => null),
    client
      .fetch<{ slug: string }[]>(eventCategoriesQuery)
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

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudies ?? [])
    .filter((study) => study.slug)
    .map((study) => ({
      url: `${BASE_URL}/resources/case-studies/${study.slug}`,
      lastModified: study.publishedAt ? new Date(study.publishedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  // Expired events must never be advertised in the sitemap — their page is noindex.
  const eventRoutes: MetadataRoute.Sitemap = (events ?? [])
    .filter((event) => event.slug && !isExpiredEvent(event.endDate, event.startDate))
    .map((event) => ({
      url: `${BASE_URL}/events/${event.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const eventCountryRoutes: MetadataRoute.Sitemap = (eventCountries ?? [])
    .filter((country) => country.slug)
    .map((country) => ({
      url: `${BASE_URL}/events/country/${country.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const eventCityRoutes: MetadataRoute.Sitemap = (eventCities ?? [])
    .filter((city) => city.slug)
    .map((city) => ({
      url: `${BASE_URL}/events/city/${city.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const eventCategoryRoutes: MetadataRoute.Sitemap = (eventCategories ?? [])
    .filter((category) => category.slug)
    .map((category) => ({
      url: `${BASE_URL}/events/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  return [
    ...staticRoutes,
    ...legalRoutes,
    ...customPageRoutes,
    ...blogPostRoutes,
    ...blogCategoryRoutes,
    ...caseStudyRoutes,
    ...eventRoutes,
    ...eventCategoryRoutes,
    ...eventCountryRoutes,
    ...eventCityRoutes,
  ]
}
