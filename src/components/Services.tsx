'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiLayers, FiDatabase, FiServer, FiTool } from 'react-icons/fi'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: 'Full Stack Web Development',
      description: 'End-to-end scalable web apps built with the MERN stack.',
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: 'Frontend Design & UI/UX',
      description: 'Responsive, elegant, and user-first designs using React, Next.js, and Tailwind.',
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: 'API Development & Integration',
      description: 'Secure APIs connecting your systems and platforms.',
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: 'Database Design & Optimization',
      description: 'Efficient data systems using MongoDB, NeonDB, and MySQL.',
    },
    {
      icon: <FiTool className="w-8 h-8" />,
      title: 'Custom Web Solutions',
      description: 'Tailored web applications designed specifically for your unique business needs.',
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: 'Hosting & Maintenance',
      description: 'Smooth deployments on Vercel, Netlify, or custom servers.',
    },
  ]

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
            Comprehensive solutions for your digital needs
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-light dark:glass p-10 rounded-3xl card-hover group relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-gray-500 dark:text-gray-400 italic mt-16 text-lg"
        >
          *Pricing varies based on project requirements
        </motion.p>
      </div>
    </section>
  )
}

export default Services
