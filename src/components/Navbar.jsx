import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, MessageCircleMore } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

function Navbar({ dark, onToggleTheme }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  const navItem = (to, label) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'text-cyan-400' : 'text-white/80 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-[#0D1B2A]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_#00E0FF]" />
            <span className="text-white font-bold tracking-wider text-lg">AXIOM</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItem('/', 'Home')}
            {navItem('/services', 'Services')}
            {navItem('/about', 'About')}
            {navItem('/portfolio', 'Portfolio')}
            {navItem('/contact', 'Contact')}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 shadow-[0_0_20px_#00E0FF] transition"
            >
              <MessageCircleMore size={18} />
              <span className="text-sm">WhatsApp</span>
            </a>
            <button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-1">
            <div className="flex flex-col rounded-lg bg-white/5 p-2">
              {navItem('/', 'Home')}
              {navItem('/services', 'Services')}
              {navItem('/about', 'About')}
              {navItem('/portfolio', 'Portfolio')}
              {navItem('/contact', 'Contact')}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
