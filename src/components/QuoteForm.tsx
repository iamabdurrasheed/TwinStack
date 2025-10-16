'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiSend, FiCode, FiLayers, FiZap } from 'react-icons/fi'

type FormData = {
  name: string
  email: string
  description: string
  location: string
}

const QuoteForm = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Send email using Web3Forms
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      
      if (!accessKey) {
        throw new Error('Email service not configured. Please add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local')
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Quote Request from ${data.name}`,
          from_name: 'TwinStack Solutions Website',
          name: data.name,
          email: data.email,
          location: data.location,
          message: data.description,
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Store in localStorage for admin to view
        const existingQuotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]')
        const newQuote = {
          ...data,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          status: 'pending'
        }
        existingQuotes.push(newQuote)
        localStorage.setItem('quoteRequests', JSON.stringify(existingQuotes))
        
        toast.success('Quote request submitted! We\'ll get back to you within 24 hours.')
        reset()
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="quote" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Get a <span className="gradient-text">Quote</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Let&apos;s build your next big idea. Fill out the form and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-light dark:glass p-8 rounded-3xl border-2 border-primary/10">
              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="mb-5">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Location *
                </label>
                <input
                  {...register('location', { required: 'Location is required' })}
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Your city or country"
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  {...register('description', { required: 'Project description is required' })}
                  id="description"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-bg text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Request
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                ⚡ We respond within 24 hours
              </p>
            </form>

            {/* WhatsApp CTA */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Prefer to chat directly?
              </p>
              <a
                href="https://wa.me/918008684271"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light dark:glass hover:glow-hover transition-all font-semibold text-sm border border-primary/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
            style={{ marginTop: '-2cm' }}
          >
            <div className="relative w-full h-[600px]">
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-10 w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center shadow-2xl"
              >
                <FiCode className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 30, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-40 right-10 w-32 h-32 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl glass-light dark:glass flex items-center justify-center border-2 border-primary/20"
              >
                <FiLayers className="w-16 h-16 text-primary" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-20 left-20 w-28 h-28 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-xl flex items-center justify-center shadow-xl border border-primary/30"
              >
                <FiZap className="w-14 h-14 text-accent" />
              </motion.div>

              {/* Central Glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"
              />

              {/* Decorative Circles */}
              <motion.div
                animate={{ 
                  rotate: 360
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-80 h-80 rounded-full border-2 border-dashed border-primary/30" />
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: -360
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-60 h-60 rounded-full border border-accent/20" />
              </motion.div>

              {/* Code Brackets */}
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="text-8xl font-bold gradient-text opacity-20">
                  {'</>'}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default QuoteForm
