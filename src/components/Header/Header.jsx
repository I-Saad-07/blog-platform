import React, { useState } from 'react'  // ADD useState
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)  // ADD state for mobile menu

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    }, 
    {
      name: "Blog",
      slug: "/all-posts",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Create",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (slug) => {
    navigate(slug)
    setIsMenuOpen(false)  // Close menu after navigation
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container>
        <nav className="flex items-center justify-between py-3 md:py-4">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <Logo width="32px" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-lg md:text-xl font-bold text-text-primary hidden sm:block">
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.slug)}
                  className={`
                    px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${item.name === 'Create' 
                      ? 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/20' 
                      : 'text-text-secondary hover:text-primary hover:bg-surface-light/50'
                    }
                    ${location.pathname === item.slug ? 'bg-surface-light text-primary' : ''}
                  `}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <div className="ml-1 md:ml-2">
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {authStatus && (
              <div className="mr-2">
                <LogoutBtn />
              </div>
            )}
            <button 
              onClick={toggleMenu}
              className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-surface-light/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                // X icon when menu is open
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu - CONDITIONAL RENDERING */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border animate-slideDown">
            <div className="py-2 space-y-1">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.slug)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${item.name === 'Create' 
                        ? 'bg-gradient-primary text-white' 
                        : 'text-text-secondary hover:text-primary hover:bg-surface-light/50'
                      }
                      ${location.pathname === item.slug ? 'bg-surface-light text-primary' : ''}
                    `}
                  >
                    {item.name}
                  </button>
                ) : null
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header