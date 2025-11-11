import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { ServicesGrid, AboutSection } from './components/Sections'
import Footer from './components/Footer'
import { getSettings } from './utils/api'

function App() {
  const [dark, setDark] = useState(true)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const s = await getSettings()
        setSettings(s)
        if (typeof s.theme_default_dark === 'boolean') {
          setDark(s.theme_default_dark)
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#0D1B2A'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#F1F1F1'
    }
  }, [dark])

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />

      <main className="pt-16">
        <Hero />
        <ServicesGrid />
        <AboutSection />
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${settings?.whatsapp_number ? String(settings.whatsapp_number).replace('+','') : '15551234567'}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 rounded-full bg-cyan-500 text-[#0D1B2A] p-4 shadow-[0_0_30px_#00E0FF] hover:shadow-[0_0_45px_#00E0FF] transition"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.52 0 .21 5.31.21 11.85c0 2.09.55 4.13 1.58 5.93L0 24l6.38-1.66a11.78 11.78 0 0 0 5.68 1.45h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.14-3.4-8.31zM12.07 21.3h-.01a9.46 9.46 0 0 1-4.83-1.32l-.35-.21-3.79 1 1.02-3.7-.23-.38a9.49 9.49 0 0 1-1.46-5.06c0-5.24 4.27-9.51 9.51-9.51a9.47 9.47 0 0 1 6.73 2.79 9.46 9.46 0 0 1 2.78 6.72c0 5.24-4.27 9.51-9.51 9.51zm5.23-7.1c-.28-.14-1.66-.82-1.92-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.64-1.56-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.35 0 1.39 1 2.74 1.14 2.93.14.19 1.96 2.99 4.74 4.19.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.66-.68 1.89-1.34.23-.66.23-1.23.16-1.34-.07-.11-.26-.18-.54-.32z"/></svg>
      </a>
    </div>
  )
}

export default App
