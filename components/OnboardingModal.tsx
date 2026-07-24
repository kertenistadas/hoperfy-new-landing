'use client'

import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  source?: string
  initialEmail?: string
}

type ProductInterest = 'tickets' | 'hotels' | 'both'

const CALENDLY_URL = 'https://calendly.com/tadas-hoperfy/30min'

const productOptions: { value: ProductInterest; title: string; description: string }[] = [
  { value: 'tickets', title: 'Ticketing', description: 'Sell tickets across multiple channels' },
  { value: 'hotels', title: 'Hotel booking', description: 'White-label hotel booking for attendees' },
  { value: 'both', title: 'Both', description: 'Full event commerce suite' },
]

const attendeeOptions: { value: string; label: string }[] = [
  { value: 'under-200', label: 'Under 200' },
  { value: '200-500', label: '200–500' },
  { value: '500-2000', label: '500–2000' },
  { value: '2000+', label: '2000+' },
]

const productLabels: Record<ProductInterest, string> = {
  tickets: 'Ticketing',
  hotels: 'Hotel booking',
  both: 'Both',
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function OnboardingModal({ isOpen, onClose, source, initialEmail }: Props) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(initialEmail ?? '')
  const [emailError, setEmailError] = useState('')
  const [productInterest, setProductInterest] = useState<ProductInterest | null>(null)
  const [eventName, setEventName] = useState('')
  const [attendees, setAttendees] = useState('')
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Reset to a clean state each time the modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setEmail(initialEmail ?? '')
      setEmailError('')
      setProductInterest(null)
      setEventName('')
      setAttendees('')
      setEventStartDate('')
      setEventEndDate('')
      setEventLocation('')
      setSubmitting(false)
      setSubmitError('')
    }
  }, [isOpen, initialEmail])

  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = original
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  async function handleNextFromStep1() {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: source ?? 'homepage' }),
      })
    } catch {}
    setStep(2)
  }

  async function handleClose() {
    if (step === 1 && isValidEmail(email)) {
      try {
        await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: source ?? 'homepage' }),
        })
      } catch {}
    }
    onClose()
  }

  function selectProduct(value: ProductInterest) {
    setProductInterest(value)
    setStep(3)
  }

  async function submitLead() {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          productInterest,
          eventName: eventName || undefined,
          attendees: attendees || undefined,
          eventStartDate: eventStartDate || undefined,
          eventEndDate: eventEndDate || undefined,
          eventLocation: eventLocation || undefined,
          source: source ?? 'unknown',
        }),
      })
      if (res.ok) {
        setStep(5)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const showCounter = step >= 1 && step <= 4
  const progress = (step / 5) * 100

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden bg-[#f3f4f6]">
          <div
            className="h-full bg-[#1a6cf5] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close X */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-[#9ca3af] hover:text-[#0a0a0a] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header row: back + step counter */}
        <div className="flex items-center gap-3 mb-6 h-5">
          {step >= 2 && step <= 4 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7.5 3L4.5 6L7.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          )}
          {showCounter && (
            <span className="text-[12px] font-medium text-[#9ca3af] ml-auto">
              Step {step} of 4
            </span>
          )}
        </div>

        {/* Step 1 — Email */}
        {step === 1 && (
          <div>
            <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-2">
              Let&apos;s get started
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] mb-6">
              What&apos;s your work email?
            </p>
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNextFromStep1()
              }}
              placeholder="you@company.com"
              className="h-11 px-4 border border-[#e5e7eb] rounded-lg focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 outline-none w-full transition-all placeholder:text-[#9ca3af]"
            />
            {emailError && <p className="mt-2 text-[13px] text-red-500">{emailError}</p>}
            <button
              type="button"
              onClick={handleNextFromStep1}
              className="mt-6 h-12 w-full bg-[#1a6cf5] text-white rounded-lg font-medium hover:bg-[#1558cc] transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 — Product interest */}
        {step === 2 && (
          <div>
            <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-2">
              What do you need?
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] mb-6">
              Choose what you want to set up for your event
            </p>
            <div className="flex flex-col gap-3">
              {productOptions.map((option) => {
                const selected = productInterest === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectProduct(option.value)}
                    className={`text-left rounded-xl border p-4 transition-colors ${
                      selected
                        ? 'border-[#1a6cf5] bg-[#eef4ff]'
                        : 'border-[#e5e7eb] hover:border-[#1a6cf5]'
                    }`}
                  >
                    <p className="text-[15px] font-semibold text-[#0a0a0a]">{option.title}</p>
                    <p className="text-[13px] font-light text-[#6b7280] mt-0.5">{option.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3 — Event details */}
        {step === 3 && (
          <div>
            <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-2">
              Tell us about your event
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] mb-6">
              This helps us tailor your setup. You can skip anything.
            </p>

            <label className="block text-[13px] font-medium text-[#374151] mb-2">Event name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. TechConf 2026"
              className="h-11 px-4 border border-[#e5e7eb] rounded-lg focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 outline-none w-full transition-all placeholder:text-[#9ca3af]"
            />

            <label className="block text-[13px] font-medium text-[#374151] mt-5 mb-2">Expected attendees</label>
            <div className="grid grid-cols-2 gap-3">
              {attendeeOptions.map((option) => {
                const selected = attendees === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAttendees(selected ? '' : option.value)}
                    className={`h-11 rounded-lg border text-[14px] font-medium transition-colors ${
                      selected
                        ? 'border-[#1a6cf5] bg-[#eef4ff] text-[#0a0a0a]'
                        : 'border-[#e5e7eb] text-[#374151] hover:border-[#1a6cf5]'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep(4)}
              className="mt-6 h-12 w-full bg-[#1a6cf5] text-white rounded-lg font-medium hover:bg-[#1558cc] transition-colors"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="mt-3 w-full text-[13px] text-[#9ca3af] hover:text-[#6b7280] transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 4 — When & where */}
        {step === 4 && (
          <div>
            <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-2">
              When and where?
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] mb-6">
              Last bit — both optional.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-medium text-[#0a0a0a] mb-2">Start date</label>
                <input
                  type="date"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="h-11 px-4 border border-[#e5e7eb] rounded-lg focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 outline-none w-full text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#0a0a0a] mb-2">End date</label>
                <input
                  type="date"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  min={eventStartDate}
                  className="h-11 px-4 border border-[#e5e7eb] rounded-lg focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 outline-none w-full text-[14px]"
                />
              </div>
            </div>

            <label className="block text-[13px] font-medium text-[#374151] mt-5 mb-2">Location</label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="City or country"
              className="h-11 px-4 border border-[#e5e7eb] rounded-lg focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 outline-none w-full transition-all placeholder:text-[#9ca3af]"
            />

            {submitError && <p className="mt-4 text-[13px] text-red-500">{submitError}</p>}

            <button
              type="button"
              onClick={submitLead}
              disabled={submitting}
              className="mt-6 h-12 w-full bg-[#1a6cf5] text-white rounded-lg font-medium hover:bg-[#1558cc] transition-colors disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Finish'}
            </button>
            <button
              type="button"
              onClick={submitLead}
              disabled={submitting}
              className="mt-3 w-full text-[13px] text-[#9ca3af] hover:text-[#6b7280] transition-colors disabled:opacity-60"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 5 — Success */}
        {step === 5 && (
          <div>
            <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-2">
              You&apos;re all set.
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] mb-6">
              We&apos;re setting up your event. You should get an email from us shortly.
            </p>

            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 mb-6 text-[14px]">
              {productInterest && (
                <div className="flex justify-between gap-4 py-1">
                  <span className="text-[#6b7280]">Interest</span>
                  <span className="text-[#0a0a0a] font-medium">{productLabels[productInterest]}</span>
                </div>
              )}
              {eventName && (
                <div className="flex justify-between gap-4 py-1">
                  <span className="text-[#6b7280]">Event</span>
                  <span className="text-[#0a0a0a] font-medium">{eventName}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 py-1">
                <span className="text-[#6b7280]">Email</span>
                <span className="text-[#0a0a0a] font-medium truncate max-w-[220px]">{email}</span>
              </div>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-full bg-[#1a6cf5] text-white rounded-lg font-medium hover:bg-[#1558cc] transition-colors"
            >
              Talk to us now
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full text-[13px] text-[#9ca3af] hover:text-[#6b7280] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
