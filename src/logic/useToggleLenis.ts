import { useLenis } from '@/components/LenisScroll'
import React from 'react'

interface UseToggleLenisReturn {
  lenisStart: () => void;
  lenisStop: () => void;
}

export const useToggleLenis = (): UseToggleLenisReturn => {
  const lenis = useLenis()

  const lenisStart = (): void => {
    lenis?.start()
  }

  const lenisStop = (): void => {
    lenis?.stop()
  }

  return {
    lenisStart,
    lenisStop
  }
}

