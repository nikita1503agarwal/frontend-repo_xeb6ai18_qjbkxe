import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function GlowButton({ children }) {
  return (
    <button className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:text-white shadow-[0_0_25px_#00E0FF] hover:shadow-[0_0_35px_#00E0FF] transition-colors">
      <span className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-xl pointer-events-none" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative transition-transform group-hover:translate-x-1" size={18} />
    </button>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/60 to-[#0D1B2A] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            INNOVATE. BUILD. TRANSFORM WITH AXIOM.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 text-lg text-white/80 max-w-2xl"
          >
            We design smart digital experiences that move businesses forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <GlowButton>Get Started</GlowButton>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition">
              View Our Work
            </button>
          </motion.div>
        </div>
        <div className="hidden lg:block" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />
    </section>
  )
}
