class TextMotionBlur extends HTMLElement {

  constructor() {

    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    this.style(shadowRoot)
    this.direction = this.getAttribute('direction')
    shadowRoot.innerHTML += this.render();

  }

  style(root) {

    const style = document.createElement('style');
    style.textContent = `
      svg {
        display: none;
      }
      span {
        position: relative;
        display: inline-block;
      }
      .focus {
        text-shadow: 0 0 2px;
      }
      .blur {
        position: absolute;
        left: 0;
        top: 0;
        filter: url(#motion-blur-filter) brightness(200%);
      }
    `
    root.appendChild(style);

  }

  render() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg">
        <!-- filterUnits is required to prevent clipping the blur outside the viewBox -->
        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="${this.getAttribute('x') || 100} ${this.getAttribute('y') || 0}"></feGaussianBlur>
        </filter>
      </svg>
      <span>
        <span class="blur">${this.innerHTML}</span>
        <span class="focus">${this.innerHTML}</span>
      </span>
    `
  }

}

customElements.define('text-motion-blur', TextMotionBlur);