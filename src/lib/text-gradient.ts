import { getFilterBlur } from './get-filter-blur'

const NAME = 'text-gradient'

class TextGradient extends HTMLElement {
  root: ShadowRoot
  name: string
  colourStops: string[]

  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.name = this.getAttribute('name') || NAME
    this.colourStops = (this.getAttribute('stops') || '').split(',')
    this.registerCSSProps()
    this.renderStyles()
    this.render()
  }

  registerCSSProps() {
    this.colourStops.forEach((_, idx) => {
      try {
        CSS.registerProperty({
          name: `--${this.name}-stop${idx}`,
          syntax: '<color>',
          inherits: false,
          initialValue: 'transparent',
        })
      } catch (error) {
        if (this.getAttribute('debug')) {
          console.warn(
            `CSS property --${this.name}-stop${idx} previously registered`
          )
        }
      }
    })
  }

  renderStyles() {
    const style = document.createElement('style')

    style.textContent = `
      @keyframes animate {
        0% {
          ${this.colourStops
            .map(
              (value, idx) => `--${this.name}-stop${idx}: ${value};`
            )
            .join('')}
        }
        100% {
          ${this.colourStops
            .reverse()
            .map(
              (value, idx) => `--${this.name}-stop${idx}: ${value};`
            )
            .join('')}
        }
      }
      svg {
        display: none;
      }
      span {
        ${this.colourStops.reduce(
          (acc, cur, idx) =>
            `${acc} --${this.name}-stop${idx}: ${cur.trim()};`,
          ''
        )}
        background-image: linear-gradient(
          ${this.getAttribute('angle') ?? '240'}deg,
          ${this.colourStops.map(
            (_, idx) => `var(--${this.name}-stop${idx})`
          )}
        );
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        position: relative;
        animation: animate 4s infinite ease alternate;
      }
      .wrapper {
        display: inline-block;
        position: relative;
      }
      .blur {
        position: absolute;
        left: 0;
        top: 0;
        opacity: .2;
      }
      .blur-wide {
        filter: url(#gaussian-wide) brightness(200%);
      }
      .blur-narrow {
        filter: url(#gaussian-narrow) brightness(200%);
        transform: scaleY(.75);
      }
    `

    this.root.appendChild(style)
  }

  render() {
    this.root.innerHTML += `
      ${getFilterBlur('gaussian-wide', {
        x: +(this.getAttribute('x') || 40),
        y: +(this.getAttribute('y') || 4),
      })}
      ${getFilterBlur('gaussian-narrow', {
        x: +(this.getAttribute('x') || 6),
        y: +(this.getAttribute('y') || 4),
      })}
      <div class="wrapper">
        <span class="blur blur-wide">${this.innerHTML}</span>
        <span class="blur blur-narrow">${this.innerHTML}</span>
        <span>${this.innerHTML}</span>
      </div>
    `
  }
}

customElements.define('text-gradient', TextGradient)
