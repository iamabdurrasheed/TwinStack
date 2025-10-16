'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, 
  SiFirebase, SiGit, SiGithub, SiVercel,
  SiFigma, SiPostman
} from 'react-icons/si'
import { FiCode } from 'react-icons/fi'

const TechStack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const technologies = [
    { name: 'React.js', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
    { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'Express.js', icon: <SiExpress />, color: '#000000' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'GitHub', icon: <SiGithub />, color: '#181717' },
    { name: 'Vercel', icon: <SiVercel />, color: '#000000' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
    { name: 'VS Code', icon: <FiCode />, color: '#007ACC' },
  ]

  return (
    <section id="techstack" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Technologies we use to build amazing products
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass-light dark:glass p-6 rounded-2xl flex flex-col items-center justify-center group cursor-pointer glow-hover"
            >
              <div 
                className="text-5xl mb-3 transition-all duration-300 group-hover:animate-float"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
