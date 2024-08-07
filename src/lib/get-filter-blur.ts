export const getFilterBlur = (
  id: string,
  { x, y }: { x: number; y: number }
) => `
  <svg xmlns="http://www.w3.org/2000/svg">
    <!-- filterUnits is required to prevent clipping the blur outside the viewBox -->
    <filter id="${id}" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="${x} ${y}"></feGaussianBlur>
    </filter>
  </svg>
`
