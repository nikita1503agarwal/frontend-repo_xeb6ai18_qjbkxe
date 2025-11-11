import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { listProjects } from '../utils/api'

const filters = ['All', 'Web', 'AI', 'Mobile', 'Branding']

export default function Portfolio() {
  const [dark, setDark] = useState(true)
  const [active, setActive] = useState('All')
  const [items, setItems] = useState([])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#0D1B2A'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#F1F1F1'
    }
  }, [dark])

  useEffect(() => {
    (async () => {
      const data = await listProjects(active === 'All' ? undefined : active)
      setItems(data)
    })()
  }, [active])

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
            {items.map(item => (
              <div key={item._id} className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img src={item.image_url} alt={item.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
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
