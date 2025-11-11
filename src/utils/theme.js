export function getInitialTheme() {
  const stored = localStorage.getItem('axiom_theme_dark')
  if (stored !== null) return stored === 'true'
  return true
}

export function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
    document.body.style.backgroundColor = '#0D1B2A'
  } else {
    document.documentElement.classList.remove('dark')
    document.body.style.backgroundColor = '#F1F1F1'
  }
}

export function setTheme(dark) {
  localStorage.setItem('axiom_theme_dark', String(dark))
  applyTheme(dark)
}

export function toggleTheme(current) {
  const next = !current
  setTheme(next)
  window.dispatchEvent(new CustomEvent('axiom-theme-changed', { detail: { dark: next } }))
  return next
}
