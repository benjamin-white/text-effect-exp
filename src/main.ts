import './style.css'
import './lib/text-gradient'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = [
  {
    component: 'text-gradient',
    content: 'Ark.lo',
    props: {
      style:
        'text-transform: uppercase; font-style: italic; letter-spacing: .1em',
      angle: 45,
      stops: ['#7319fa', '#ff33b4', '#ff7e29', 'pink'],
    },
  },
  {
    component: 'text-gradient',
    content: 'SOTO &amp; SATO',
    props: {
      style: 'text-transform: uppercase; letter-spacing: .2em',
      angle: 230,
      stops: ['blue', 'green', 'yellow', 'pink'],
    },
  },
  {
    component: 'text-gradient',
    content: 'BOS:6230',
    props: {
      style: 'letter-spacing: .2em',
      angle: 106,
      stops: ['white', 'beige', 'grey'],
      x: 12,
      y: 6,
      debug: true,
    },
  },
]
  .map(({ component, content, props }) => {
    const componentProps = props
      ? Object.entries(props).reduce(
          (acc, [key, value]) => `${acc} ${key}="${value}"`,
          ''
        )
      : ''
    return `<p><${component}${componentProps}>${content}</${component}></p>`
  })
  .join('')
