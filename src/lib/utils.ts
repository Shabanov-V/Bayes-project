/**
 * A simple debounce function that delays invoking a function until after `waitFor` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * @param func The function to debounce.
 * @param waitFor The number of milliseconds to delay.
 * @returns A debounced version of the function.
 */
export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
}
