export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number,
) {
  let timerId = 0;

  return (...args: Parameters<T>): void => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(func, delay, ...args);
  };
}
