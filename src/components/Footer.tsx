import React from 'react'
import { motion } from 'framer-motion'
import { 
  Music, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter,
  Heart,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    services: [
      { name: 'Wedding Photography', href: '#services' },
      { name: 'Wedding Videography', href: '#services' },
      { name: 'Album Creation', href: '#services' },
      { name: 'Audio Ads', href: '#services' },
      { name: 'Karizma Albums', href: '#services' },
      { name: 'Wedding Cards', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Services', href: '#services' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#' },
      { name: 'Testimonials', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Refund Policy', href: '#' }
    ]
  }

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: Facebook, name: 'Facebook', href: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, name: 'YouTube', href: '#', color: 'hover:text-red-400' },
    { icon: Twitter, name: 'Twitter', href: '#', color: 'hover:text-sky-400' }
  ]

  return (
    <footer className="bg-gradient-to-b from-dark-900 to-black border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold gradient-text">
                    KCP Music
                  </h3>
                  <p className="text-xs text-gray-400">Premium Recording Studio</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Creating magical moments through professional wedding photography, 
                videography, and premium audio services that capture your most precious memories.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">info@kcpmusic.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">123 Music Street, Creative District</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-primary-500/30`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-heading font-semibold text-white mb-6">
                Our Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-heading font-semibold text-white mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter & Legal */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-heading font-semibold text-white mb-4">
                  Stay Updated
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-gold-500 text-white rounded-r-lg hover:from-primary-600 hover:to-gold-600 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-lg font-heading font-semibold text-white mb-4">
                  Legal
                </h4>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2024 KCP Music. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>in India. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-gray-400 text-sm">
                Crafting memories since 2014
              </div>
              
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-500 to-gold-500 rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer