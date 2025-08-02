import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, ExternalLink, Star, Filter } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'photography', name: 'Photography' },
    { id: 'videography', name: 'Videography' },
    { id: 'audio', name: 'Audio' },
    { id: 'albums', name: 'Albums' }
  ]

  const portfolioItems = [
    {
      id: 1,
      title: 'Elegant Wedding Ceremony',
      category: 'wedding',
      type: 'Photography',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Beautiful outdoor wedding ceremony with stunning natural lighting'
    },
    {
      id: 2,
      title: 'Cinematic Wedding Film',
      category: 'videography',
      type: 'Videography',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Romantic wedding film capturing every precious moment'
    },
    {
      id: 3,
      title: 'Pre-Wedding Photoshoot',
      category: 'photography',
      type: 'Photography',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Romantic pre-wedding session in a beautiful garden setting'
    },
    {
      id: 4,
      title: 'Music Album Production',
      category: 'audio',
      type: 'Audio Production',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Professional music album recording and production'
    },
    {
      id: 5,
      title: 'Karizma Wedding Album',
      category: 'albums',
      type: 'Album Design',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Premium wedding album with artistic layouts and design'
    },
    {
      id: 6,
      title: 'Reception Highlights',
      category: 'videography',
      type: 'Videography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dynamic reception videography with multiple camera angles'
    },
    {
      id: 7,
      title: 'Bridal Portraits',
      category: 'photography',
      type: 'Photography',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Elegant bridal portrait session with dramatic lighting'
    },
    {
      id: 8,
      title: 'Audio Advertisement',
      category: 'audio',
      type: 'Audio Ads',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Professional audio advertisement with voice-over and music'
    },
    {
      id: 9,
      title: 'Traditional Wedding',
      category: 'wedding',
      type: 'Photography & Video',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Traditional wedding ceremony with cultural elements'
    }
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-dark-900 to-dark-800">
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
            <span className="text-primary-400 font-medium">Our Portfolio</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Showcasing Our <span className="gradient-text">Finest</span> Work
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Explore our portfolio of exceptional projects that demonstrate our commitment 
            to excellence and artistic vision across all our services.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-gold-500 text-white shadow-lg'
                    : 'bg-white/10 border border-white/20 text-gray-300 hover:border-primary-500/30 hover:text-primary-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {category.id === 'all' && <Filter className="w-4 h-4" />}
                  <span>{category.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 shadow-luxury hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-primary-500/50 transition-colors duration-300"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-primary-500/50 transition-colors duration-300"
                      >
                        {item.category === 'videography' || item.category === 'audio' ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <ExternalLink className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/30 rounded-2xl transition-colors duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
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
              Ready to Create Your <span className="gradient-text">Masterpiece?</span>
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Let's discuss your vision and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Start Your Project</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>View Showreel</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio