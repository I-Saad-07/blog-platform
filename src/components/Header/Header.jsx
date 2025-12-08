import React from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    }, 
    {
      name: "Blogs",
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo width="40px" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className={`
                    px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-200
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
              <div className="ml-2">
                <LogoutBtn />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header