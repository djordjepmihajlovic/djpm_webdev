const HOME_KNOT_OPTIONS = [
  { src: '/img/unknot_gray.png', alt: 'Unknot' },
  { src: '/img/trefoil_gray.png', alt: 'Trefoil knot' },
  { src: '/img/4_1_gray.png', alt: 'Figure-eight knot' },
  { src: '/img/5_1_gray.png', alt: 'Cinquefoil knot' },
  { src: '/img/5_2_gray.png', alt: 'Three-twist knot' }
]

const MAX_HOME_KNOT_DROPS = 12
const INTERACTIVE_HOME_KNOT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  'iframe',
  '[role="button"]',
  '[data-home-knot-ignore]'
].join(',')

const randomBetween = (min, max) => Math.random() * (max - min) + min

const createHomeKnotDrop = (x, y) => {
  const knot = HOME_KNOT_OPTIONS[Math.floor(Math.random() * HOME_KNOT_OPTIONS.length)]
  const drop = document.createElement('div')
  const image = document.createElement('img')

  drop.className = 'home-knot-drop'
  drop.style.left = `${x}px`
  drop.style.top = `${y}px`
  drop.style.setProperty('--home-knot-drift-x', `${randomBetween(-140, 140)}px`)
  drop.style.setProperty('--home-knot-start-rotate', `${randomBetween(-35, 35)}deg`)
  drop.style.setProperty('--home-knot-end-rotate', `${randomBetween(180, 540)}deg`)
  drop.style.setProperty('--home-knot-duration', `${randomBetween(1.6, 2.4)}s`)

  image.className = 'home-knot-drop__image'
  image.src = knot.src
  image.alt = knot.alt
  image.decoding = 'async'

  drop.appendChild(image)
  drop.addEventListener(
    'animationend',
    () => {
      drop.remove()
    },
    { once: true }
  )

  return drop
}

const initHomeKnotDrops = () => {
  const homePlayground = document.getElementById('home-knot-playground')
  if (!homePlayground) {
    return
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) {
      return
    }

    if (event.target instanceof Element && event.target.closest(INTERACTIVE_HOME_KNOT_SELECTOR)) {
      return
    }

    const activeDrops = document.querySelectorAll('.home-knot-drop')
    if (activeDrops.length >= MAX_HOME_KNOT_DROPS) {
      activeDrops[0].remove()
    }

    document.body.appendChild(createHomeKnotDrop(event.clientX, event.clientY))
  })
}

document.addEventListener('DOMContentLoaded', initHomeKnotDrops)
