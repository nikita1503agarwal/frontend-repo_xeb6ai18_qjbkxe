import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const data = [
  { id: 1, title: 'E-commerce Redesign', tag: 'Web', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'AI Chat Assistant', tag: 'AI', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Fintech Mobile App', tag: 'Mobile', img: 'https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'Brand Identity Pack', tag: 'Branding', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, title: 'SaaS Dashboard', tag: 'Web', img: 'https://images.unsplash.com/photo-1547658719-8cfd968234dc?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, title: 'Automation Pipeline', tag: 'AI', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop' },
]

const filters = ['All', 'Web', 'AI', 'Mobile', 'Branding']

export default function Portfolio() {
  const [dark, setDark] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#0D1B2A'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#F1F1F1'
    }
  }, [dark])

  const filtered = active === 'All' ? data : data.filter(d => d.tag === active)

  return (
    <div className="bg-[#0D1B2A] min-h-screen">
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold">Our Work</h1>

          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  active === f ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'text-white/70 border-white/20 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img src={item.img} alt={item.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-white/60 text-sm">{item.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
