import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ServicesGrid } from '../components/Sections'

export default function Services() {
  const [dark, setDark] = useState(true)
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
    <div className="bg-[#0D1B2A] min-h-screen">
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
