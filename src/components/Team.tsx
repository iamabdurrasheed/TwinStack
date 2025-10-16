'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const Team = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const team = [
    {
      name: 'Mohammed Abdur Rasheed',
      role: 'Full Stack Developer (MERN)',
      description: 'Focused on backend systems, scalability, and intuitive user experiences.',
      skills: 'MongoDB, Express.js, React.js, Node.js, REST APIs, Cloud Integrations',
      github: 'https://github.com/iamabdurrasheed',
      linkedin: 'https://www.linkedin.com/in/iamabdurrasheed',
    },
    {
      name: 'Rohith Singh',
      role: 'Frontend & Full Stack Developer',
      description: 'Dedicated to crafting sleek, high-performance interfaces and user experiences.',
      skills: 'Next.js, React.js, TailwindCSS, Node.js, Firebase, UI/UX Design',
      github: 'https://github.com/rohittcodes',
      linkedin: 'https://www.linkedin.com/in/rohittcodes/',
    },
  ]

  return (
    <section id="team" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Meet the <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            The minds behind TwinStack Solutions
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-light dark:glass p-10 rounded-3xl card-hover border-2 border-transparent hover:border-primary/30 transition-all relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Name & Role */}
                <h3 className="text-3xl font-poppins font-bold gradient-text text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-primary text-center font-semibold mb-6 text-lg">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-lg leading-relaxed">
                  {member.description}
                </p>

                {/* Skills */}
                <p className="text-sm text-gray-500 dark:text-gray-500 text-center mb-8 leading-relaxed">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Skills:</span> {member.skills}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl glass-light dark:glass hover:glow-hover transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-6 h-6" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl glass-light dark:glass hover:glow-hover transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
