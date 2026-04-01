// src/composables/useScrollReveal.js
import { onMounted, onUnmounted } from 'vue'

/**
 * Adds IntersectionObserver to elements with .reveal class.
 * Adds .visible when they enter the viewport.
 */
export function useScrollReveal(root = null) {
  let observer = null

  onMounted(() => {
    const container = root?.value ?? document
    const els = container.querySelectorAll('.reveal')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
