'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiCode, FiUsers, FiBriefcase, FiFileText, FiLogOut, FiPlus, FiEdit2, FiTrash2, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

interface Developer {
  id: string
  name: string
  role: string
  github?: string
  linkedin?: string
  twitter?: string
}

interface Content {
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  email: string
  phone: string
}

const AdminDashboard = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'developers' | 'content'>('projects')
  const [isLoading, setIsLoading] = useState(false)

  // Projects State
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      tags: ['Next.js', 'TypeScript', 'Stripe'],
      github: 'https://github.com/example',
      demo: 'https://demo.com'
    }
  ])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)

  // Services State
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Web Development',
      description: 'Building modern, responsive websites',
      icon: 'FiCode'
    }
  ])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showServiceForm, setShowServiceForm] = useState(false)

  // Developers State
  const [developers, setDevelopers] = useState<Developer[]>([
    {
      id: '1',
      name: 'Mohammed Abdur Rasheed',
      role: 'Full Stack Developer',
      github: 'https://github.com/iamabdurrasheed',
      linkedin: 'https://linkedin.com/in/iamabdurrasheed'
    },
    {
      id: '2',
      name: 'Rohith Singh',
      role: 'Full Stack Developer',
      github: 'https://github.com/rohithsingh',
      linkedin: 'https://linkedin.com/in/rohithsingh'
    }
  ])
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null)
  const [showDeveloperForm, setShowDeveloperForm] = useState(false)

  // Content State
  const [content, setContent] = useState<Content>({
    heroTitle: 'Two Minds. One Stack. Limitless Solutions.',
    heroSubtitle: 'Crafting digital experiences that transform ideas into reality',
    aboutText: 'TwinStack Solutions is a dynamic duo of Computer Science enthusiasts...',
    email: 'info@twinstack.dev',
    phone: '+1 234 567 890'
  })

  useEffect(() => {
    setMounted(true)
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
      return
    }

    // Load data from localStorage
    try {
      const savedProjects = localStorage.getItem('projects')
      const savedServices = localStorage.getItem('services')
      const savedDevelopers = localStorage.getItem('developers')
      const savedContent = localStorage.getItem('content')

      if (savedProjects) setProjects(JSON.parse(savedProjects))
      if (savedServices) setServices(JSON.parse(savedServices))
      if (savedDevelopers) setDevelopers(JSON.parse(savedDevelopers))
      if (savedContent) setContent(JSON.parse(savedContent))
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Error loading saved data')
    }
  }, [router])

  if (!mounted) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    toast.success('Logged out successfully')
    router.push('/admin')
  }

  // Project CRUD
  const saveProject = (project: Project) => {
    let updatedProjects
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === project.id ? project : p)
      toast.success('Project updated successfully')
    } else {
      const newProject = { ...project, id: Date.now().toString() }
      updatedProjects = [...projects, newProject]
      toast.success('Project added successfully')
    }
    setProjects(updatedProjects)
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const deleteProject = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?')
    if (confirmed) {
      const updatedProjects = projects.filter(p => p.id !== id)
      setProjects(updatedProjects)
      localStorage.setItem('projects', JSON.stringify(updatedProjects))
      toast.success('Project deleted successfully')
    }
  }

  // Service CRUD
  const saveService = (service: Service) => {
    let updatedServices
    if (editingService) {
      updatedServices = services.map(s => s.id === service.id ? service : s)
      toast.success('Service updated successfully')
    } else {
      const newService = { ...service, id: Date.now().toString() }
      updatedServices = [...services, newService]
      toast.success('Service added successfully')
    }
    setServices(updatedServices)
    localStorage.setItem('services', JSON.stringify(updatedServices))
    setShowServiceForm(false)
    setEditingService(null)
  }

  const deleteService = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this service?')
    if (confirmed) {
      const updatedServices = services.filter(s => s.id !== id)
      setServices(updatedServices)
      localStorage.setItem('services', JSON.stringify(updatedServices))
      toast.success('Service deleted successfully')
    }
  }

  // Developer CRUD
  const saveDeveloper = (developer: Developer) => {
    let updatedDevelopers
    if (editingDeveloper) {
      updatedDevelopers = developers.map(d => d.id === developer.id ? developer : d)
      toast.success('Developer updated successfully')
    } else {
      const newDeveloper = { ...developer, id: Date.now().toString() }
      updatedDevelopers = [...developers, newDeveloper]
      toast.success('Developer added successfully')
    }
    setDevelopers(updatedDevelopers)
    localStorage.setItem('developers', JSON.stringify(updatedDevelopers))
    setShowDeveloperForm(false)
    setEditingDeveloper(null)
  }

  const deleteDeveloper = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to remove this developer?')
    if (confirmed) {
      const updatedDevelopers = developers.filter(d => d.id !== id)
      setDevelopers(updatedDevelopers)
      localStorage.setItem('developers', JSON.stringify(updatedDevelopers))
      toast.success('Developer removed successfully')
    }
  }

  // Content Update
  const saveContent = () => {
    localStorage.setItem('content', JSON.stringify(content))
    toast.success('Content updated successfully')
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="glass-light dark:glass border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold gradient-text">TwinStack Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <TabButton
            active={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
            icon={<FiBriefcase />}
            label="Our Work"
          />
          <TabButton
            active={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
            icon={<FiCode />}
            label="Services"
          />
          <TabButton
            active={activeTab === 'developers'}
            onClick={() => setActiveTab('developers')}
            icon={<FiUsers />}
            label="Developers"
          />
          <TabButton
            active={activeTab === 'content'}
            onClick={() => setActiveTab('content')}
            icon={<FiFileText />}
            label="Content"
          />
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Projects</h2>
              <button
                onClick={() => {
                  setEditingProject(null)
                  setShowProjectForm(true)
                }}
                className="flex items-center gap-2 gradient-bg text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all"
              >
                <FiPlus /> Add Project
              </button>
            </div>

            {showProjectForm && (
              <ProjectForm
                project={editingProject}
                onSave={saveProject}
                onCancel={() => {
                  setShowProjectForm(false)
                  setEditingProject(null)
                }}
              />
            )}

            <div className="grid gap-4">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => {
                    setEditingProject(project)
                    setShowProjectForm(true)
                  }}
                  onDelete={() => deleteProject(project.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
              <button
                onClick={() => {
                  setEditingService(null)
                  setShowServiceForm(true)
                }}
                className="flex items-center gap-2 gradient-bg text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all"
              >
                <FiPlus /> Add Service
              </button>
            </div>

            {showServiceForm && (
              <ServiceForm
                service={editingService}
                onSave={saveService}
                onCancel={() => {
                  setShowServiceForm(false)
                  setEditingService(null)
                }}
              />
            )}

            <div className="grid gap-4">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={() => {
                    setEditingService(service)
                    setShowServiceForm(true)
                  }}
                  onDelete={() => deleteService(service.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Developers Tab */}
        {activeTab === 'developers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
              <button
                onClick={() => {
                  setEditingDeveloper(null)
                  setShowDeveloperForm(true)
                }}
                className="flex items-center gap-2 gradient-bg text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all"
              >
                <FiPlus /> Add Developer
              </button>
            </div>

            {showDeveloperForm && (
              <DeveloperForm
                developer={editingDeveloper}
                onSave={saveDeveloper}
                onCancel={() => {
                  setShowDeveloperForm(false)
                  setEditingDeveloper(null)
                }}
              />
            )}

            <div className="grid gap-4">
              {developers.map(developer => (
                <DeveloperCard
                  key={developer.id}
                  developer={developer}
                  onEdit={() => {
                    setEditingDeveloper(developer)
                    setShowDeveloperForm(true)
                  }}
                  onDelete={() => deleteDeveloper(developer.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Website Content</h2>
            
            <div className="glass-light dark:glass p-6 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={content.heroSubtitle}
                  onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  About Text
                </label>
                <textarea
                  value={content.aboutText}
                  onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={content.email}
                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={content.phone}
                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={saveContent}
                className="gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
              >
                Save Content
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
      active
        ? 'gradient-bg text-white shadow-xl'
        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
    }`}
  >
    {icon} {label}
  </button>
)

// Project Form Component
const ProjectForm = ({ project, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: '',
      title: '',
      description: '',
      tags: [],
      github: '',
      demo: ''
    }
  )
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit}
      className="glass-light dark:glass p-6 rounded-2xl space-y-4"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {project ? 'Edit Project' : 'Add New Project'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Add a tag..."
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 gradient-bg text-white rounded-lg hover:shadow-xl transition-all"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub URL (optional)
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Demo URL (optional)
          </label>
          <input
            type="url"
            value={formData.demo}
            onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
        >
          Save Project
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  )
}

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete }: any) => (
  <div className="glass-light dark:glass p-6 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag: string) => (
        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
    <div className="flex gap-4 text-sm">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
          GitHub
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
          Live Demo
        </a>
      )}
    </div>
  </div>
)

// Service Form Component
const ServiceForm = ({ service, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState<Service>(
    service || {
      id: '',
      title: '',
      description: '',
      icon: 'FiCode'
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit}
      className="glass-light dark:glass p-6 rounded-2xl space-y-4"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {service ? 'Edit Service' : 'Add New Service'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Service Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Icon (React Icons name)
        </label>
        <select
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        >
          <option value="FiCode">Code</option>
          <option value="FiSmartphone">Smartphone</option>
          <option value="FiLayout">Layout</option>
          <option value="FiZap">Zap</option>
          <option value="FiDatabase">Database</option>
          <option value="FiCloud">Cloud</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
        >
          Save Service
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  )
}

// Service Card Component
const ServiceCard = ({ service, onEdit, onDelete }: any) => (
  <div className="glass-light dark:glass p-6 rounded-xl">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{service.description}</p>
        <span className="text-sm text-gray-500">Icon: {service.icon}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  </div>
)

// Developer Form Component
const DeveloperForm = ({ developer, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState<Developer>(
    developer || {
      id: '',
      name: '',
      role: '',
      github: '',
      linkedin: '',
      twitter: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit}
      className="glass-light dark:glass p-6 rounded-2xl space-y-4"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {developer ? 'Edit Developer' : 'Add New Developer'}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          GitHub URL (optional)
        </label>
        <input
          type="url"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          LinkedIn URL (optional)
        </label>
        <input
          type="url"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Twitter URL (optional)
        </label>
        <input
          type="url"
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
        >
          Save Developer
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  )
}

// Developer Card Component
const DeveloperCard = ({ developer, onEdit, onDelete }: any) => (
  <div className="glass-light dark:glass p-6 rounded-xl">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{developer.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{developer.role}</p>
        <div className="flex gap-4">
          {developer.github && (
            <a href={developer.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FiGithub size={20} />
            </a>
          )}
          {developer.linkedin && (
            <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FiLinkedin size={20} />
            </a>
          )}
          {developer.twitter && (
            <a href={developer.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FiTwitter size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  </div>
)

export default AdminDashboard
