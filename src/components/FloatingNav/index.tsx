'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/api/staticData/headerNavLinks'
import Style from './FloatingNav.module.scss'
import { gsap } from 'gsap'

const FloatingNav: React.FC = () => {
  const pathname = usePathname()
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Animate FloatingNav on mount
    if (navRef.current) {
      gsap.from(navRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }
  }, []);

  useEffect(() => {
    const checkBackgroundColor = () => {
      if (!navRef.current) return

      const navRect = navRef.current.getBoundingClientRect()
      const navCenterY = navRect.top + navRect.height / 2
      const navCenterX = navRect.left + navRect.width / 2

      // Get element at nav position
      const elementBelow = document.elementFromPoint(navCenterX, navCenterY - 100) as HTMLElement
      
      if (!elementBelow) return

      // Traverse up the DOM tree to find element with background color
      let currentElement: HTMLElement | null = elementBelow
      let backgroundColor = ''

      while (currentElement && !backgroundColor) {
        const computedStyle = window.getComputedStyle(currentElement)
        const bgColor = computedStyle.backgroundColor
        const bgImage = computedStyle.backgroundImage

        // Check if background is not transparent
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          backgroundColor = bgColor
        } else if (bgImage && bgImage !== 'none') {
          // If there's a background image, assume it might be dark
          backgroundColor = 'rgb(0, 0, 0)'
        }

        currentElement = currentElement.parentElement
      }

      // Determine if background is dark
      if (backgroundColor) {
        // Extract RGB values
        const rgbMatch = backgroundColor.match(/\d+/g)
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0])
          const g = parseInt(rgbMatch[1])
          const b = parseInt(rgbMatch[2])
          
          // Calculate luminance
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          
          // If luminance is less than 0.5, it's a dark background
          setIsDarkBackground(luminance < 0.5)
        }
      }
    }

    // Check on scroll and resize
    const handleScroll = () => {
      checkBackgroundColor()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', checkBackgroundColor)
    
    // Initial check
    setTimeout(checkBackgroundColor, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkBackgroundColor)
    }
  }, [])

  return (
    <nav 
      ref={navRef}
      className={`${Style.FloatingNav} ${isDarkBackground ? Style.DarkBackground : ''}`}
      aria-label="Main navigation"
      role="navigation"
    >
      <div className={Style.NavContainer}>
        {headerNavLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.title}
              href={link.href}
              className={`${Style.NavLink} ${isActive ? Style.Active : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={Style.NavText}>{link.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default FloatingNav

