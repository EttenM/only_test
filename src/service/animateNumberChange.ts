export function animateNumberChange(
  element: any,
  newValue: string,
  duration = 1000
) {
  const startValue = parseInt(element.textContent) || 1900;
  const startTime = performance.now();
  function update(currentTime: any) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.round(
      startValue + (+newValue - startValue) * progress
    );
    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
