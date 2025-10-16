'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from 'next-themes'
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
  const { theme } = useTheme()

  const technologies = [
    { name: 'React.js', icon: <SiReact />, color: '#61DAFB', darkColor: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', darkColor: '#FFFFFF' },
    { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#06B6D4', darkColor: '#06B6D4' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', darkColor: '#3178C6' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', darkColor: '#339933' },
    { name: 'Express.js', icon: <SiExpress />, color: '#000000', darkColor: '#FFFFFF' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', darkColor: '#47A248' },
    { name: 'MySQL', icon: <SiMysql />, color: '#4479A1', darkColor: '#4479A1' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28', darkColor: '#FFCA28' },
    { name: 'Git', icon: <SiGit />, color: '#F05032', darkColor: '#F05032' },
    { name: 'GitHub', icon: <SiGithub />, color: '#181717', darkColor: '#E6E6E6' },
    { name: 'Vercel', icon: <SiVercel />, color: '#000000', darkColor: '#FFFFFF' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E', darkColor: '#F24E1E' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37', darkColor: '#FF6C37' },
    { name: 'VS Code', icon: <FiCode />, color: '#007ACC', darkColor: '#007ACC' },
  ]

  return (
    <section id="techstack" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
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
                style={{ color: theme === 'dark' ? tech.darkColor : tech.color }}
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
