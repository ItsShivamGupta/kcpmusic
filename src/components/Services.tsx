import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Video, Music, Mic, Heart, CreditCard, Star, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Capture your special day with our professional wedding photography services. Every moment, every emotion, beautifully preserved.',
      features: ['Pre-wedding shoots', 'Ceremony coverage', 'Reception photography', 'Candid moments'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Video,
      title: 'Wedding Videography',
      description: 'Cinematic wedding films that tell your love story. Professional videography with stunning visual narratives.',
      features: ['4K video quality', 'Drone footage', 'Same-day highlights', 'Full ceremony recording'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Music,
      title: 'Album Audio/Video Creation',
      description: 'Professional album production services for musicians and artists. From recording to final mastering.',
      features: ['Studio recording', 'Music production', 'Video albums', 'Professional mixing'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mic,
      title: 'Audio Ads Creation',
      description: 'Create compelling audio advertisements that capture attention and drive results for your business.',
      features: ['Voice-over recording', 'Background music', 'Sound effects', 'Professional editing'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Karizma Albums',
      description: 'Beautiful, artistic photo albums with creative layouts and premium printing quality.',
      features: ['Custom layouts', 'Premium materials', 'Digital design', 'Fast delivery'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Wedding Cards',
      description: 'Elegant wedding invitation cards with personalized designs that reflect your unique style.',
      features: ['Custom designs', 'Premium printing', 'Multiple formats', 'Quick turnaround'],
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-5 h-5 text-primary-400" />
            <span className="text-primary-400 font-medium">Our Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Premium <span className="gradient-text">Creative</span> Services
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From capturing your most precious moments to creating professional audio content, 
            we offer a comprehensive suite of premium services tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-500 shadow-luxury hover:shadow-2xl">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-heading font-semibold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-primary-400 font-medium group-hover:text-primary-300 transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-gold-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-gold-500/10 border border-primary-500/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Create Something <span className="gradient-text">Amazing?</span>
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Let's discuss your project and bring your vision to life with our premium services.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services