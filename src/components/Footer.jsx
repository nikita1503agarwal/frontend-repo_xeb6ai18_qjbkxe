import { Facebook, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-white/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_#00E0FF]" />
            <span className="font-bold">AXIOM</span>
          </div>
          <p className="mt-3 text-sm text-white/60 max-w-sm">We design smart digital experiences that move businesses forward.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-white font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/portfolio" className="hover:text-white">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>hello@axiom.studio</li>
              <li>+1 (555) 123-4567</li>
              <li>Dubai • Riyadh • Remote</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Follow</p>
          <div className="flex items-center gap-3 text-white/70">
            <a href="#" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-white"><Github size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/50 text-sm">© {new Date().getFullYear()} Axiom Studio. All rights reserved.</div>
    </footer>
  )
}
