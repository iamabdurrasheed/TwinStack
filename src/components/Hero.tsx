'use client'

import { motion } from 'framer-motion'

const Hero = () => {
  const scrollToQuote = () => {
    const element = document.getElementById('quote')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-poppins font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00B4D8] via-[#0096c7] to-[#8A2BE2] bg-clip-text text-transparent">
                TwinStack
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Solutions</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-poppins font-normal text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              Two Minds. One Stack. Limitless Solutions.
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 mb-16"
          >
            We Build Beautiful, Scalable Web Experiences
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToQuote}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#8A2BE2] text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Get a Quote
            </button>
            <a
              href="mailto:22bd1a0538@gmail.com"
              className="px-8 py-4 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B4D8] dark:hover:border-[#00B4D8] transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Email Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
