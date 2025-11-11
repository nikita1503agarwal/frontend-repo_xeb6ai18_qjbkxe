import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getSettings, saveSettings, listProjects, createProject, updateProject, deleteProject } from '../utils/api'

export default function Admin() {
  const [dark, setDark] = useState(true)
  const [tab, setTab] = useState('settings')
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({ title: '', tag: 'Web', image_url: '', description: '', case_study_url: '', featured: false })
  const [notice, setNotice] = useState('')

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
      try {
        setLoading(true)
        const s = await getSettings()
        setSettings(s)
        const p = await listProjects()
        setProjects(p)
      } catch (e) {
        setNotice(`Error: ${e.message}`)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  const saveAll = async () => {
    try {
      setLoading(true)
      await saveSettings(settings)
      setNotice('Settings saved')
    } catch (e) {
      setNotice(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const addProject = async () => {
    try {
      setLoading(true)
      const res = await createProject(newProject)
      const refreshed = await listProjects()
      setProjects(refreshed)
      setNewProject({ title: '', tag: 'Web', image_url: '', description: '', case_study_url: '', featured: false })
      setNotice('Project created')
    } catch (e) {
      setNotice(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const updateProj = async (id, patch) => {
    try {
      setLoading(true)
      await updateProject(id, patch)
      const refreshed = await listProjects()
      setProjects(refreshed)
      setNotice('Project updated')
    } catch (e) {
      setNotice(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteProj = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      setLoading(true)
      await deleteProject(id)
      setProjects(projects.filter(p => p._id !== id))
      setNotice('Project deleted')
    } catch (e) {
      setNotice(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0D1B2A] min-h-screen">
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-3xl font-bold">Admin Control Panel</h1>
            <div className="text-white/70">{loading ? 'Working…' : notice}</div>
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            {['settings', 'projects'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md border ${tab === t ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'text-white/70 border-white/20 hover:bg-white/10'}`}>{t[0].toUpperCase() + t.slice(1)}</button>
            ))}
          </div>

          {tab === 'settings' && (
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {[
                ['hero_title', 'Hero Title'],
                ['hero_subtitle', 'Hero Subtitle'],
                ['whatsapp_number', 'WhatsApp Number (E.164)'],
                ['contact_email', 'Contact Email'],
                ['address_line', 'Address Line'],
                ['city', 'City'],
                ['country', 'Country'],
              ].map(([key, label]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-white/60 text-sm mb-1">{label}</label>
                  <input value={settings[key] || ''} onChange={e => updateSetting(key, e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
              ))}

              <div className="flex items-center gap-3">
                <input id="default_dark" type="checkbox" checked={!!settings.theme_default_dark} onChange={e => updateSetting('theme_default_dark', e.target.checked)} />
                <label htmlFor="default_dark" className="text-white/80">Default to Dark Theme</label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['stat_projects', 'stat_clients', 'stat_awards'].map(key => (
                  <div key={key} className="flex flex-col">
                    <label className="text-white/60 text-sm mb-1">{key.replace('stat_', '').toUpperCase()}</label>
                    <input type="number" value={settings[key] ?? 0} onChange={e => updateSetting(key, Number(e.target.value))} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                  </div>
                ))}
              </div>

              <button onClick={saveAll} className="mt-4 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:text-white shadow-[0_0_25px_#00E0FF] hover:shadow-[0_0_35px_#00E0FF] transition">Save Settings</button>
            </div>
          )}

          {tab === 'projects' && (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Add New Project</h2>
                <div className="space-y-3">
                  {[
                    ['title', 'Title'],
                    ['image_url', 'Image URL'],
                    ['description', 'Description'],
                    ['case_study_url', 'Case Study URL'],
                  ].map(([key, label]) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-white/60 text-sm mb-1">{label}</label>
                      <input value={newProject[key] || ''} onChange={e => setNewProject(prev => ({ ...prev, [key]: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                    </div>
                  ))}

                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                      <label className="text-white/60 text-sm mb-1">Tag</label>
                      <select value={newProject.tag} onChange={e => setNewProject(prev => ({ ...prev, tag: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                        {['Web','AI','Mobile','Branding'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <input id="featured" type="checkbox" checked={!!newProject.featured} onChange={e => setNewProject(prev => ({ ...prev, featured: e.target.checked }))} />
                      <label htmlFor="featured" className="text-white/80">Featured</label>
                    </div>
                  </div>

                  <button onClick={addProject} className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:text-white shadow-[0_0_25px_#00E0FF] hover:shadow-[0_0_35px_#00E0FF] transition">Create Project</button>
                </div>
              </div>

              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Projects</h2>
                <div className="grid gap-3">
                  {projects.map(p => (
                    <div key={p._id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4">
                      <img src={p.image_url} alt={p.title} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-semibold">{p.title}</p>
                            <p className="text-white/60 text-sm">{p.tag}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => updateProj(p._id, { featured: !p.featured })} className="px-3 py-2 rounded bg-white/10 text-white/80 hover:bg-white/20">{p.featured ? 'Unfeature' : 'Feature'}</button>
                            <button onClick={() => deleteProj(p._id)} className="px-3 py-2 rounded bg-red-500/20 text-red-200 border border-red-400/40 hover:bg-red-500/30">Delete</button>
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <input defaultValue={p.title} onBlur={e => updateProj(p._id, { title: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                          <input defaultValue={p.tag} onBlur={e => updateProj(p._id, { tag: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                          <input defaultValue={p.image_url} onBlur={e => updateProj(p._id, { image_url: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm col-span-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
