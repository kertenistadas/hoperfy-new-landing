'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { EventCategory, EventCity, EventCountry, EventItem } from '@/types'
import { compareEvents } from '@/lib/eventUtils'
import EventListCard from './EventListCard'

const PAGE_SIZE = 24

const inputClass =
  'h-10 w-full px-3 text-[13px] border border-[#e5e7eb] rounded-lg outline-none focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 transition-all placeholder:text-[#9ca3af] bg-white'
const labelClass = 'block text-[10px] uppercase tracking-wider text-[#9ca3af] mb-1.5'

type Filters = {
  search: string
  category: string
  country: string
  city: string
  dateFrom: string
  dateTo: string
}

const EMPTY_FILTERS: Filters = {
  search: '',
  category: '',
  country: '',
  city: '',
  dateFrom: '',
  dateTo: '',
}

type Props = {
  events: EventItem[]
  categories: EventCategory[]
  countries: EventCountry[]
  cities: EventCity[]
}

export default function EventsDirectory({ events, categories, countries, cities }: Props) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Any filter change sends the reader back to the first page of results.
  function setFilter(patch: Partial<Filters>) {
    setFilters((current) => ({ ...current, ...patch }))
    setVisibleCount(PAGE_SIZE)
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS)
    setVisibleCount(PAGE_SIZE)
  }

  const cityOptions = useMemo(
    () => (filters.country ? cities.filter((c) => c.country?.slug === filters.country) : cities),
    [cities, filters.country],
  )

  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase()

    const matches = events.filter((event) => {
      if (term && !event.name.toLowerCase().includes(term)) return false
      if (filters.category && event.category?.slug !== filters.category) return false
      if (filters.country && event.city?.country?.slug !== filters.country) return false
      if (filters.city && event.city?.slug !== filters.city) return false
      // An undated event cannot satisfy a date window, so drop it once one is set.
      if (filters.dateFrom || filters.dateTo) {
        if (!event.startDate) return false
        // Treat each event as a range and keep the ones overlapping the window.
        if (filters.dateFrom && (event.endDate || event.startDate) < filters.dateFrom) return false
        if (filters.dateTo && event.startDate > filters.dateTo) return false
      }
      return true
    })

    // Upcoming first, then past, then events with no announced dates.
    return matches.sort(compareEvents)
  }, [events, filters])

  const hasFilters = Object.values(filters).some(Boolean)
  const visible = filtered.slice(0, visibleCount)

  return (
    <div>
      {/* Category shortcuts — indexable links, separate from the client-side filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/events/category/${cat.slug}`}
              className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#f3f4f6] text-[#374151] hover:bg-[#eef4ff] hover:text-[#1a6cf5] transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="rounded-xl border border-[#e5e7eb] p-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3">
            <label className={labelClass} htmlFor="event-search">Search</label>
            <input
              id="event-search"
              type="text"
              value={filters.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              placeholder="Search events by name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="event-category">Category</label>
            <select
              id="event-category"
              value={filters.category}
              onChange={(e) => setFilter({ category: e.target.value })}
              className={inputClass}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="event-country">Country</label>
            <select
              id="event-country"
              value={filters.country}
              // Clearing the city keeps it from silently filtering out every result.
              onChange={(e) => setFilter({ country: e.target.value, city: '' })}
              className={inputClass}
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="event-city">City</label>
            <select
              id="event-city"
              value={filters.city}
              onChange={(e) => setFilter({ city: e.target.value })}
              className={inputClass}
            >
              <option value="">All cities</option>
              {cityOptions.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="event-date-from">Date from</label>
            <input
              id="event-date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilter({ dateFrom: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="event-date-to">Date to</label>
            <input
              id="event-date-to"
              type="date"
              value={filters.dateTo}
              min={filters.dateFrom || undefined}
              onChange={(e) => setFilter({ dateTo: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="h-10 w-full px-4 text-[13px] font-medium border border-[#e5e7eb] text-[#374151] rounded-lg hover:border-[#0a0a0a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#e5e7eb]"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="text-[13px] text-[#6b7280] mb-4">
        {filtered.length === 0
          ? 'No events match your filters.'
          : `Showing ${visible.length} of ${filtered.length} event${filtered.length === 1 ? '' : 's'}`}
      </p>

      {/* Grid */}
      {visible.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((event) => (
            <EventListCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="h-11 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
