
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            <div className="inline-flex items-center">
              <Logo width="120px" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md">
              A modern blogging platform where creators share their stories, insights, and expertise with the world.
            </p>
            <p className="text-text-secondary/60 text-xs">
              &copy; {currentYear} Developers All rights reserved.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Product */}
            <div>
              <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Use Cases', 'Updates'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-text-secondary hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                      to="/"
                    >
                      <span>{item}</span>
                      <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {['Blog', 'Help Center', 'Community', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-text-secondary hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                      to="/"
                    >
                      <span>{item}</span>
                      <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licensing'].map((item) => (
                  <li key={item}>
                    <Link
                      className="text-text-secondary hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                      to="/"
                    >
                      <span>{item}</span>
                      <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary/60 text-sm text-center md:text-left mb-4 md:mb-0">
            Built with ❤️ for creators everywhere
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-text-secondary/60 hover:text-primary text-sm transition-colors">Twitter</a>
            <a href="#" className="text-text-secondary/60 hover:text-primary text-sm transition-colors">GitHub</a>
            <a href="#" className="text-text-secondary/60 hover:text-primary text-sm transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer