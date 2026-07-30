'use client'

import { useState, useEffect, useRef } from 'react'

const BOOKINGS = [{"price":3536.0,"hotel":"Hotel Crowne Plaza Festival City","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":791.0,"hotel":"Hotel Villa Emilia","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":452.0,"hotel":"Antiga Casa Buenavista","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":431.0,"hotel":"Occidental Barcelona 1929","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":503.0,"hotel":"Ofelias Hotel Barcelona 4Sup","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":309.0,"hotel":"Fira Centric","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":419.0,"hotel":"Fira Centric","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":447.0,"hotel":"Cram Hotel","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":130.0,"hotel":"Lavington Residences By Trianum","country":"Kenya","city":"Nairobi","lat":-1.2921,"lng":36.8219},{"price":226.0,"hotel":"Arco Barcelona Hotel","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":286.0,"hotel":"B-Hotel","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":314.0,"hotel":"Hotel Indigo Barcelona Plaza Espana by IHG","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":371.0,"hotel":"InterContinental Barcelona by IHG","country":"Spain","city":"Barcelona","lat":41.3851,"lng":2.1734},{"price":303.0,"hotel":"Holiday Inn Orlando International Dr-ICON by IHG","country":"United States of America","city":"Orlando","lat":28.5383,"lng":-81.3792},{"price":458.0,"hotel":"Cinnamon Grand Colombo","country":"Sri Lanka","city":"Colombo","lat":6.9271,"lng":79.8612},{"price":322.0,"hotel":"Cinnamon Life at City of Dreams","country":"Sri Lanka","city":"Colombo","lat":6.9271,"lng":79.8612},{"price":273.0,"hotel":"Wola Jana Olbrachta","country":"Poland","city":"Warsaw","lat":52.2297,"lng":21.0122},{"price":177.0,"hotel":"The Goodtime Hotel","country":"United States of America","city":"Miami Beach","lat":25.7907,"lng":-80.13},{"price":1362.0,"hotel":"Corporate Inn Sunnyvale","country":"United States of America","city":"Sunnyvale","lat":37.3688,"lng":-122.0363},{"price":58.0,"hotel":"ibis budget Katowice Centrum","country":"Poland","city":"Katowice","lat":50.2649,"lng":19.0238},{"price":597.0,"hotel":"ibis Kaunas Centre","country":"Lithuania","city":"Kaunas","lat":54.8985,"lng":23.9036},{"price":490.0,"hotel":"Residence Inn by Marriott Sunnyvale Silicon Valley II","country":"United States of America","city":"Sunnyvale","lat":37.3688,"lng":-122.0363},{"price":405.0,"hotel":"Al Seef Heritage Hotel Dubai","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":856.0,"hotel":"Larkspur Landing Sunnyvale","country":"United States of America","city":"Sunnyvale","lat":37.3688,"lng":-122.0363},{"price":682.0,"hotel":"Sunday Suites Excelsior Hotel Deira","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":386.0,"hotel":"Movenpick Grand Al Bustan Dubai","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":675.0,"hotel":"AC Hotel by Marriott Sunnyvale Cupertino","country":"United States of America","city":"Sunnyvale","lat":37.3688,"lng":-122.0363},{"price":384.0,"hotel":"Porto Bello Hotel Resort & Spa","country":"Turkiye","city":"Antalya","lat":36.8969,"lng":30.7133},{"price":2211.0,"hotel":"Holiday Inn Rome EUR Parco Dei Medici","country":"Italy","city":"Rome","lat":41.9028,"lng":12.4964},{"price":975.0,"hotel":"Sheraton Rome Parco de Medici","country":"Italy","city":"Rome","lat":41.9028,"lng":12.4964},{"price":405.0,"hotel":"Hotel Grand Pacific","country":"Singapore","city":"Singapore","lat":1.3521,"lng":103.8198},{"price":1024.0,"hotel":"QT Singapore","country":"Singapore","city":"Singapore","lat":1.3521,"lng":103.8198},{"price":407.0,"hotel":"Renaissance Brussels Hotel","country":"Belgium","city":"Brussels","lat":50.8503,"lng":4.3517},{"price":226.0,"hotel":"NH Brussels EU Berlaymont","country":"Belgium","city":"Brussels","lat":50.8503,"lng":4.3517},{"price":108.0,"hotel":"Pure White","country":"Czech Republic","city":"Prague","lat":50.0755,"lng":14.4378},{"price":299.0,"hotel":"All Suites Bordeaux Lac","country":"France","city":"Bordeaux","lat":44.8378,"lng":-0.5792},{"price":177.0,"hotel":"Holiday Inn Express London Greenwich","country":"United Kingdom","city":"London","lat":51.5074,"lng":-0.1278},{"price":715.0,"hotel":"Europe Hotel","country":"Armenia","city":"Yerevan","lat":40.1792,"lng":44.4991},{"price":492.0,"hotel":"Marski by Scandic","country":"Finland","city":"Helsinki","lat":60.1699,"lng":24.9384},{"price":638.0,"hotel":"DoubleTree by Hilton New York Downtown","country":"United States of America","city":"New York","lat":40.7128,"lng":-74.006},{"price":311.0,"hotel":"Kaunas City","country":"Lithuania","city":"Kaunas","lat":54.8985,"lng":23.9036},{"price":829.0,"hotel":"CABINN Apartments","country":"Denmark","city":"Copenhagen","lat":55.6761,"lng":12.5683},{"price":537.0,"hotel":"CABINN Metro Hotel","country":"Denmark","city":"Copenhagen","lat":55.6761,"lng":12.5683},{"price":427.0,"hotel":"Crowne Plaza Copenhagen Towers","country":"Denmark","city":"Copenhagen","lat":55.6761,"lng":12.5683},{"price":1764.0,"hotel":"Grand Nikko Tokyo Daiba","country":"Japan","city":"Tokyo","lat":35.6762,"lng":139.6503},{"price":242.0,"hotel":"Focus Hotel Premium Gdansk","country":"Poland","city":"Gdansk","lat":54.352,"lng":18.6466},{"price":601.0,"hotel":"Kalev Spa Hotel & Waterpark","country":"Estonia","city":"Tallinn","lat":59.437,"lng":24.7536},{"price":379.0,"hotel":"Rija Old Town Hotel","country":"Estonia","city":"Tallinn","lat":59.437,"lng":24.7536},{"price":300.0,"hotel":"Tallink Spa and Conference Hotel","country":"Estonia","city":"Tallinn","lat":59.437,"lng":24.7536},{"price":858.0,"hotel":"Point A Edinburgh Haymarket","country":"United Kingdom","city":"Edinburgh","lat":55.9533,"lng":-3.1883},{"price":207.0,"hotel":"BEI Hotel San Francisco","country":"United States of America","city":"San Francisco","lat":37.7749,"lng":-122.4194},{"price":1264.0,"hotel":"Intercity Sao Paulo Nacoes Unidas","country":"Brazil","city":"Sao Paulo","lat":-23.5505,"lng":-46.6333},{"price":1133.0,"hotel":"Ilunion Bilbao Hotel","country":"Spain","city":"Bilbao","lat":43.263,"lng":-2.935},{"price":662.0,"hotel":"Hotel Melia Bilbao","country":"Spain","city":"Bilbao","lat":43.263,"lng":-2.935},{"price":1811.0,"hotel":"W Sao Paulo","country":"Brazil","city":"Sao Paulo","lat":-23.5505,"lng":-46.6333},{"price":465.0,"hotel":"City Lodge Hotel GrandWest","country":"South Africa","city":"Cape Town","lat":-33.9249,"lng":18.4241},{"price":1289.0,"hotel":"Le Meridien Dubai Hotel & Conference Centre","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":934.0,"hotel":"Vida Creek Harbour","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":4007.0,"hotel":"Sofitel Dubai The Obelisk","country":"United Arab Emirates","city":"Dubai","lat":25.2048,"lng":55.2708},{"price":244.0,"hotel":"Maidan Palace Hotel","country":"Ukraine","city":"Kyiv","lat":50.4501,"lng":30.5234},{"price":638.0,"hotel":"Prana Resort Nandana","country":"Thailand","city":"Koh Samui","lat":9.512,"lng":100.0136},{"price":936.0,"hotel":"Skyline Hotel","country":"Germany","city":"Frankfurt","lat":50.1109,"lng":8.6821},{"price":182.0,"hotel":"Radisson Blu Daugava Hotel","country":"Latvia","city":"Riga","lat":56.9496,"lng":24.1052},{"price":89.0,"hotel":"Wellton Riga Hotel & SPA","country":"Latvia","city":"Riga","lat":56.9496,"lng":24.1052},{"price":128.0,"hotel":"Rixwell Old Riga Palace Hotel","country":"Latvia","city":"Riga","lat":56.9496,"lng":24.1052},{"price":195.0,"hotel":"Hotel Royal Prague","country":"Czech Republic","city":"Prague","lat":50.0755,"lng":14.4378}]

const INTERVALS = [5000, 8000, 14000, 4000, 7000, 13000, 3000, 6000]

type Booking = typeof BOOKINGS[0]
type ActivePin = Booking & { id: number; opacity: number }

function latLngToXY(lat: number, lng: number, width: number, height: number) {
  const x = ((lng + 180) / 360) * width
  const y = ((90 - lat) / 180) * height
  return { x, y }
}

export default function LiveBookingMap() {
  const [activePins, setActivePins] = useState<ActivePin[]>([])
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)
  const [bookingIndex, setBookingIndex] = useState(() => Math.floor(Math.random() * BOOKINGS.length))
  const idRef = useRef(0)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    let intervalIndex = 0

    function showNextBooking() {
      setBookingIndex(prev => {
        const booking = BOOKINGS[prev % BOOKINGS.length]
        const newPin: ActivePin = { ...booking, id: idRef.current++, opacity: 1 }

        setActivePins(pins => [...pins.slice(-8), newPin])
        setCurrentBooking(booking)

        const pinId = newPin.id
        setTimeout(() => {
          setActivePins(pins => pins.map(p => p.id === pinId ? { ...p, opacity: 0 } : p))
        }, (INTERVALS[intervalIndex % INTERVALS.length] - 1000))

        setTimeout(() => {
          setActivePins(pins => pins.filter(p => p.id !== pinId))
        }, INTERVALS[intervalIndex % INTERVALS.length])

        return (prev + 1) % BOOKINGS.length
      })

      intervalIndex = (intervalIndex + 1) % INTERVALS.length
      timeoutId = setTimeout(showNextBooking, INTERVALS[intervalIndex % INTERVALS.length])
    }

    timeoutId = setTimeout(showNextBooking, INTERVALS[0])

    return () => clearTimeout(timeoutId)
  }, [])

  const W = 800
  const H = 400

  return (
    <div
      className="relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#e5e7eb]"
      style={{
        minHeight: '360px',
        backgroundImage: 'url("/worldmap.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay over the world map background */}
      <div className="absolute inset-0 bg-[#0a0a0a]/65 rounded-xl" />

      {/* SVG holds the animated booking pins only */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* Booking pins */}
        {activePins.map((pin) => {
          const { x, y } = latLngToXY(pin.lat, pin.lng, W, H)
          return (
            <g key={pin.id} style={{ transition: 'opacity 1s ease', opacity: pin.opacity }}>
              <circle cx={x} cy={y} r="14" fill="none" stroke="#1a6cf5" strokeWidth="1">
                <animate attributeName="r" from="6" to="22" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx={x} cy={y} r="5" fill="#1a6cf5" stroke="white" strokeWidth="1.5"/>
            </g>
          )
        })}
      </svg>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #0d1117 100%)' }}/>

      {/* Live booking toast - bottom left */}
      {currentBooking && (
        <div
          key={bookingIndex}
          className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg border border-[#e5e7eb] max-w-[280px]"
          style={{ animation: 'slideUp 0.4s ease' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0 animate-pulse"/>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-0.5">Live booking</p>
              <p className="text-[13px] font-semibold text-[#0a0a0a] leading-tight">{currentBooking.hotel}</p>
              <p className="text-[11px] text-[#6b7280] mt-0.5">{currentBooking.city}, {currentBooking.country}</p>
              <p className="text-[14px] font-black text-[#1a6cf5] mt-1">€{currentBooking.price.toLocaleString()} value</p>
            </div>
          </div>
        </div>
      )}

      {/* Live indicator top left */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
        <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Live</span>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
