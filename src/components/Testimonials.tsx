'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc',
      text: 'TwinStack Solutions delivered an exceptional web application that exceeded our expectations. Their attention to detail and commitment to quality is outstanding!',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCo',
      text: 'Working with this team was a pleasure. They understood our requirements perfectly and delivered a scalable solution on time.',
    },
    {
      name: 'Priya Sharma',
      role: 'Founder, DigitalBuzz',
      text: 'The best developers I\'ve worked with! They transformed our vision into a beautiful, functional website. Highly recommended!',
    },
  ]

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-poppins font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            What our clients say about working with us
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass-light dark:glass p-12 md:p-16 rounded-3xl text-center border-2 border-primary/10"
          >
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 italic leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            <div className="gradient-text font-poppins font-bold text-2xl">
              {testimonials[currentIndex].name}
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              {testimonials[currentIndex].role}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-4 rounded-full glass-light dark:glass hover:glow-hover transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-12'
                      : 'bg-gray-400 dark:bg-gray-600 w-3 hover:w-6'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-4 rounded-full glass-light dark:glass hover:glow-hover transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
