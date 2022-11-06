import './style.css'
import './lib/motionBlur'
import './lib/gradient'

const customText = {
  'text-motion-blur': {
    content: 'Motion Blur',
    props: {
      style:
        'color: #ff33b4; text-transform: uppercase; letter-spacing: 0.1em; font-style: italic',
      x: 50
    }
  },
  'text-gradient': {
    content: 'Gradient',
    props: {
      style: 'text-transform: uppercase; letter-spacing: .2em',
      angle: 230,
      stops: ['#7319fa', '#ff33b4', '#ff7e29', 'pink'],
    },
  },
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML =
  Object.entries(customText).reduce((acc, [key, value]) => {
    const props = value.props
      ? Object.entries(value.props).reduce((acc, [key, value]) => `${acc} ${key}="${value}"`, '')
      : ''
    return `${acc}<p><${key}${props}>${value.content || 'Jazz Text'}</${key}></p>`
  }, '')
