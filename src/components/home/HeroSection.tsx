import { motion, useReducedMotion } from 'framer-motion'
import { HeroSearch } from '@/components/search/HeroSearch'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease },
  },
}

const brandReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease },
  },
}

const WARM_ORBS = [
  { size: 280, top: '12%', left: '8%', delay: 0 },
  { size: 200, top: '55%', left: '72%', delay: 1.2 },
  { size: 160, top: '70%', left: '18%', delay: 2.4 },
  { size: 120, top: '25%', left: '85%', delay: 0.8 },
]

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 text-white">
      {/* Background image with slow Ken Burns */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=900&fit=crop&q=80')] bg-cover bg-center"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.22 }}
        transition={{ duration: 2.2, ease }}
        aria-hidden
      />

      {/* Warm overlay — feels like stepping inside */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/78 to-brand-700/65" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(251,191,36,0.12),transparent_55%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(12,135,232,0.15),transparent_50%)]" aria-hidden />

      {/* Floating warm light orbs */}
      {!reduceMotion &&
        WARM_ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-accent-400/10 blur-3xl"
            style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.15, 1],
              y: [0, -18, 0],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
            aria-hidden
          />
        ))}

      {/* Top shimmer line — doorway glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:py-28">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Brand badge */}
          <motion.div variants={brandReveal} className="mb-6 inline-flex">
            <span className="hero-brand-badge group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent-400/30 bg-white/5 px-5 py-2 backdrop-blur-md">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-400/20 to-transparent"
                animate={reduceMotion ? {} : { x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                aria-hidden
              />
              <span className="relative text-lg font-extrabold tracking-tight sm:text-xl">
                <span className="hero-brand-text">Durga Property</span>
              </span>
              <span className="relative hidden text-xs font-semibold uppercase tracking-widest text-accent-400/90 sm:inline">
                Gurgaon
              </span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[0.25em] text-accent-400 sm:text-base"
          >
            Where dreams come home
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="block">Gurgaon&apos;s</span>
            <motion.span
              className="mt-1 block bg-gradient-to-r from-white via-brand-100 to-accent-100 bg-clip-text text-transparent"
              initial={reduceMotion ? {} : { backgroundPosition: '0% 50%' }}
              animate={reduceMotion ? {} : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ backgroundSize: '200% auto' }}
            >
              Finest Properties
            </motion.span>
          </motion.h1>

          {/* Description with highlighted brand */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100/90 lg:text-xl"
          >
            Curated collections across Old Gurgaon, Golf Course Road, and New Gurgaon —
            discover your next home with{' '}
            <span className="hero-brand-inline font-bold">
              Durga Property
            </span>
            .
          </motion.p>

          {/* Trust chips */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {['RERA Verified', 'Old Gurgaon Expert', 'Premium Curated'].map((chip, i) => (
              <motion.span
                key={chip}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-100 backdrop-blur-sm sm:text-sm"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5, ease }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Search — rises in like opening the door to browse */}
        <motion.div
          className="mt-12 w-full max-w-4xl"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.9, ease }}
        >
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-brand-950/40 backdrop-blur-md"
            whileHover={reduceMotion ? {} : { scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSearch />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        {!reduceMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-brand-200/60"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Explore</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
