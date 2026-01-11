'use client'

import Lenis from 'lenis'
import { useEffect, useRef, createContext, useContext, useState, ReactNode } from 'react'

interface LenisContextType {
  start: () => void;
  stop: () => void;
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean }) => void;
  scroll: number;
}

const LenisContext = createContext<LenisContextType | null>(null)

export const useLenis = (): LenisContextType | null => {
  return useContext(LenisContext)
}

interface LenisScrollProps {
  children: ReactNode;
}

const LenisScroll: React.FC<LenisScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    const options = {
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical' as const,
      gestureDirection: 'vertical' as const,
      smooth: true,
      mouseMultiplier: 0.6,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    }

    const lenis = new Lenis(options)
    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Normal RAF loop
    let requestID: number
    function update(time: number): void {
      lenis.raf(time * 1.0)
      requestID = requestAnimationFrame(update)
    }
    requestAnimationFrame(update)

    // Connect with GSAP (if added)
    // function update(time: number) { lenis.raf(time * 1500) }
    // gsap.ticker.add(update)
    // return () => {
    //     gsap.ticker.remove(update)
    // }

    return () => {
      cancelAnimationFrame(requestID)
      lenis.destroy()
    }
  }, [])

  // Create a context value that matches the interface
  const contextValue: LenisContextType | null = lenisInstance ? {
    start: () => lenisInstance.start(),
    stop: () => lenisInstance.stop(),
    raf: (time: number) => lenisInstance.raf(time),
    destroy: () => lenisInstance.destroy(),
    scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean }) => {
      lenisInstance.scrollTo(target, options);
    },
    scroll: lenisInstance.scroll,
  } : null;

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}

export default LenisScroll

