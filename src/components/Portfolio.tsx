'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink } from 'react-icons/fi'

const Portfolio = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.',
      stack: ['MERN', 'Stripe', 'Redux'],
      image: '/placeholder-project.jpg',
      link: '#',
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Scalable chat app with real-time messaging, file sharing, and group conversations powered by WebSockets.',
      stack: ['MERN', 'Socket.io', 'AWS'],
      image: '/placeholder-project.jpg',
      link: '#',
    },
    {
      title: 'Portfolio Website Builder',
      description: 'Drag-and-drop portfolio builder with customizable templates and one-click deployment.',
      stack: ['Next.js', 'TypeScript', 'Vercel'],
      image: '/placeholder-project.jpg',
      link: '#',
    },
  ]

  return (
    <section id="portfolio" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
            Projects that showcase our expertise and commitment to excellence
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-light dark:glass rounded-3xl overflow-hidden card-hover group"
            >
              {/* Project Info */}
              <div className="p-8">
                <h3 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-lg group-hover:gap-3 duration-300"
                >
                  View Project <FiExternalLink className="group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
