import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [dark, setDark] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#0D1B2A'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#F1F1F1'
    }
  }, [dark])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setStatus('Sent! We will be in touch shortly.')
      setForm({ name: '', email: '', company: '', phone: '', message: '' })
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <div className="bg-[#0D1B2A] min-h-screen">
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-3xl font-bold">Contact Us</h1>
          <p className="text-white/70 mt-2">Tell us about your project and we’ll get back within 24 hours.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid sm:grid-cols-2 gap-4">
            <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40" placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
            <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40" placeholder="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
            <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40" placeholder="Company (optional)" name="company" value={form.company} onChange={handleChange} />
            <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40" placeholder="Phone / WhatsApp (optional)" name="phone" value={form.phone} onChange={handleChange} />
            <textarea className="sm:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 min-h-[160px]" placeholder="Tell us about your project..." name="message" value={form.message} onChange={handleChange} required />

            <button type="submit" className="sm:col-span-2 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:text-white shadow-[0_0_25px_#00E0FF] hover:shadow-[0_0_35px_#00E0FF] transition">
              Send Message
            </button>
          </form>

          {status && <p className="mt-4 text-white/80">{status}</p>}

          <div className="mt-10">
            <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10">
              <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=55.27%2C25.20%2C55.33%2C25.25&amp;layer=mapnik" className="w-full h-full" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
