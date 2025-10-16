'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMessageSquare, FiEdit, FiCode, FiZap } from 'react-icons/fi'

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      icon: <FiMessageSquare className="w-8 h-8" />,
      title: 'Plan & Discuss',
      description: 'Understanding your idea',
    },
    {
      icon: <FiEdit className="w-8 h-8" />,
      title: 'Design & Prototype',
      description: 'Visualizing your product',
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: 'Develop & Test',
      description: 'Building with precision',
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Launch & Support',
      description: 'Scaling and maintaining',
    },
  ]

  return (
    <section id="process" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
            How we bring your ideas to life
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass-light dark:glass p-6 rounded-2xl text-center card-hover">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="text-primary mb-4 flex justify-center mt-4">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-poppins font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
