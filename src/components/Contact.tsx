'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail } from 'react-icons/fi'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Footer */}
          <div className="pt-10 border-t border-gray-300 dark:border-gray-700">
            <div className="max-w-3xl mx-auto mb-8">
              {/* About Section */}
              <div className="text-center">
                <h3 className="text-2xl font-poppins font-bold gradient-text mb-4">About TwinStack</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  We&apos;re two <span className="text-primary font-semibold">Computer Science Engineering classmates</span> who turned our shared passion for technology into a vision — <span className="gradient-text font-semibold">TwinStack Solutions</span>. From college projects to real-world production apps, we&apos;ve grown into a duo that values clean code, creative design, and client satisfaction. Our goal: to build scalable, beautiful web experiences that make an impact.
                </p>
              </div>
            </div>
            
            <div className="text-center pt-6 border-t border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-base">
                © 2025 TwinStack Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
