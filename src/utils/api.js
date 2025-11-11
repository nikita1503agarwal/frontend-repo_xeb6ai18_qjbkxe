const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function getSettings() {
  const res = await fetch(`${BASE_URL}/api/admin/settings`)
  if (!res.ok) throw new Error('Failed to load settings')
  return res.json()
}

export async function saveSettings(payload) {
  const res = await fetch(`${BASE_URL}/api/admin/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to save settings')
  return res.json()
}

export async function listProjects(tag) {
  const url = tag ? `${BASE_URL}/api/admin/projects?tag=${encodeURIComponent(tag)}` : `${BASE_URL}/api/admin/projects`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load projects')
  return res.json()
}

export async function createProject(payload) {
  const res = await fetch(`${BASE_URL}/api/admin/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

export async function updateProject(id, payload) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete project')
  return res.json()
}

export { BASE_URL }
