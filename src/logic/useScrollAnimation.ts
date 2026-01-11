import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  animation?: gsap.TweenVars;
  stagger?: number;
  once?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
      animation = { opacity: 0, y: 50 },
      stagger = 0,
      once = true,
    } = options;

    const children = element.querySelectorAll('[data-animate]');
    const hasChildren = children.length > 0;

    if (hasChildren) {
      // Animate children with stagger
      gsap.set(children, animation);

      const scrollTrigger = ScrollTrigger.create({
        trigger: typeof trigger === 'string' ? element.querySelector(trigger) : trigger,
        start,
        end,
        once,
        onEnter: () => {
          if (once && hasAnimated.current) return;
          hasAnimated.current = true;
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: 'power3.out',
          });
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    } else {
      // Animate the element itself
      gsap.set(element, animation);

      const scrollTrigger = ScrollTrigger.create({
        trigger: typeof trigger === 'string' ? element.querySelector(trigger) : trigger,
        start,
        end,
        once,
        onEnter: () => {
          if (once && hasAnimated.current) return;
          hasAnimated.current = true;
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, [options]);

  return elementRef;
};

