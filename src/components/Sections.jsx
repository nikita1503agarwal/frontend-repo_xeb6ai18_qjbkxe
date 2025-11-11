import { motion } from 'framer-motion'
import { Code2, Palette, Bot, Smartphone } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    icon: Code2,
    desc: 'High-performance websites and apps built with modern stacks and best practices.'
  },
  {
    title: 'Branding & Design',
    icon: Palette,
    desc: 'Visual identities that communicate your value with clarity and confidence.'
  },
  {
    title: 'Mobile Apps',
    icon: Smartphone,
    desc: 'Cross-platform mobile experiences with native-feel performance.'
  },
  {
    title: 'AI Systems & Automation',
    icon: Bot,
    desc: 'Intelligent workflows, chatbots, and automations that scale operations.'
  },
]

export function ServicesGrid() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,224,255,0.12),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">What We Do</h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mt-3">Services focused on outcomes, speed, and reliability.</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-[radial-gradient(600px_circle_at_var(--x,_0)_var(--y,_0),rgba(0,224,255,0.18),transparent_40%)]" />
              <s.icon className="text-cyan-300" />
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,224,255,0.08),transparent)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Who We Are</h2>
        <p className="text-white/70 mt-4">
          Axiom is a studio of engineers, designers, and strategists building future-ready products and brands.
          We value clarity, speed, and innovation — and we bring that to every engagement.
        </p>
      </div>
    </section>
  )
}
