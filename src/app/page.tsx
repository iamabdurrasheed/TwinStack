import Hero from '@/components/Hero'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import Team from '@/components/Team'
import QuoteForm from '@/components/QuoteForm'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <Process />
      <Team />
      <QuoteForm />
      <Contact />
      <WhatsAppFloat />
    </main>
  )
}
