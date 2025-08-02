import React from 'react'
import { motion } from 'framer-motion'
import { Award, Clock, Users, Zap, CheckCircle, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const achievements = [
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Star, value: '50+', label: 'Awards Won' },
    { icon: Zap, value: '1000+', label: 'Projects Completed' }
  ]

  const features = [
    'State-of-the-art recording equipment',
    'Professional photography and videography gear',
    'Experienced team of creative professionals',
    'Custom solutions for every client',
    'Fast turnaround times',
    'Premium quality guarantee'
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-6 py-2 mb-6">
              <Star className="w-5 h-5 text-primary-400" />
              <span className="text-primary-400 font-medium">About KCP Music</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Crafting <span className="gradient-text">Memories</span> That Last Forever
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              At KCP Music, we believe every moment deserves to be captured with perfection. 
              With over a decade of experience in the industry, we've built our reputation 
              on delivering exceptional quality and unmatched creativity.
            </p>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Our team of passionate professionals combines technical expertise with artistic 
              vision to create stunning wedding photography, cinematic videography, premium 
              audio production, and beautiful printed materials that exceed expectations.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Work With Us</span>
            </motion.a>
          </motion.div>

          {/* Right Content - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-gold-500/20 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-luxury">
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-gold-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{achievement.value}</div>
                    <div className="text-gray-400 text-sm">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-primary-500/10 to-gold-500/10 border border-primary-500/20 rounded-2xl p-6"
              >
                <div className="text-4xl text-primary-400 mb-4">"</div>
                <p className="text-gray-300 italic mb-4 leading-relaxed">
                  Every project we undertake is a canvas for creativity. We don't just capture 
                  moments; we craft experiences that resonate with emotion and artistry.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">KC</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">KCP Music Team</div>
                    <div className="text-gray-400 text-sm">Creative Directors</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-gold-500 to-primary-500 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>

        {/* Bottom Section - Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-luxury">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              To transform ordinary moments into extraordinary memories through innovative 
              creativity, cutting-edge technology, and unwavering commitment to excellence. 
              We strive to exceed expectations and deliver results that inspire.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-primary-400">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Available 24/7 for your special moments</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About