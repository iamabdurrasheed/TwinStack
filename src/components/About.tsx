'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            About <span className="gradient-text">Us</span>
          </h2>
          <div className="glass-light dark:glass p-12 rounded-3xl max-w-5xl mx-auto">
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              We're two <span className="text-primary font-semibold">Computer Science Engineering classmates</span> who turned our shared passion for technology into a vision — <span className="gradient-text font-semibold">TwinStack Solutions</span>. From college projects to real-world production apps, we've grown into a duo that values clean code, creative design, and client satisfaction. Our goal: to build scalable, beautiful web experiences that make an impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
