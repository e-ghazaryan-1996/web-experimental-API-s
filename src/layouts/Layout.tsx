import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/constant/routes'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router'

export const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Examples', href: '/examples' },
    { name: 'Documentation', href: '/docs' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link
              to={APP_ROUTES.HOME}
              className="mr-6 flex items-center space-x-2"
            >
              <img src="/images/logo.png" alt="logo" className="size-16" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1">
            <ul className="flex items-center gap-6">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            type="button"
            className="ml-auto md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:ml-auto md:flex md:items-center md:gap-4">
            <Button asChild variant="outline">
              <Link
                to="https://github.com/e-ghazaryan-1996/web-experimental-API-s"
                target="_blank"
              >
                GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn('md:hidden', isMenuOpen ? 'block border-b' : 'hidden')}
        >
          <nav className="container py-4">
            <ul className="flex flex-col gap-4">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    to="https://github.com/e-ghazaryan-1996/web-experimental-API-s"
                    target="_blank"
                  >
                    GitHub
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-10 md:px-6 lg:py-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t px-4 py-12 md:px-6">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">WebAPI</span>
              <span className="text-primary">Lab</span>
            </div>
            <nav>
              <ul className="flex flex-wrap items-center gap-4 md:gap-6">
                {navigation.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              Built with React, Vite, and Modern Web APIs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
