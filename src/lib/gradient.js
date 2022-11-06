class TextGradient extends HTMLElement {
  
  constructor() {
    
    super();
    const shadowRoot = this.attachShadow({mode: 'open'})
    this.style(shadowRoot)
    shadowRoot.innerHTML += this.render();

  }

  style(root) {

    const style = document.createElement('style');

    (this.getAttribute('stops') || []).split(',').forEach((_, idx) => 
      CSS.registerProperty({ // clobbers global??
        name: `--stop${idx}`,
        syntax: '<color>',
        inherits: false,
        initialValue: 'transparent'
      })
    )

    style.textContent = `
      @keyframes animate {
        0% {
          ${(this.getAttribute('stops') || []).split(',').map((value, idx) => `--stop${idx}: ${value};`).join``}
        }
        100% {
          ${(this.getAttribute('stops') || []).split(',').reverse().map((value, idx) => `--stop${idx}: ${value};`).join``}
        }
      }
      span {
        --angle: 240deg;
        ${(this.getAttribute('stops') || []).split(',').reduce((acc, cur, idx) => `${acc} --stop${idx}: ${cur.trim()};`, '')}
        background-image: linear-gradient(
          ${+this.getAttribute('angle')}deg, 
          ${(this.getAttribute('stops') || []).split(',').map((_, idx) => `var(--stop${idx})`)}
        );
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        animation: animate 2s infinite ease alternate;
      }
    `

    root.appendChild(style)

  }

  render() {
    return `<span>${this.innerHTML}</span>`
  }

}

customElements.define('text-gradient', TextGradient);