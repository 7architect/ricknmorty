interface ScrollOptions {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
}

export function useInfiniteScroll(
  callback: () => void,
  options: ScrollOptions = {},
) {
  const { root = null, rootMargin = '0px', threshold = 1.0 } = options

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback() // Вызываем функцию, когда элемент пересекается
        }
      })
    },
    { root, rootMargin, threshold },
  )

  const observe = (el: Element | null) => {
    if (el) {
      observer.observe(el)
    }
  }

  const unobserve = (el: Element | null) => {
    if (el) {
      observer.unobserve(el)
    }
  }

  return { observe, unobserve }
}
