export const useDebounce = () => {
  let timeout = null
  const debounce = (callback, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback()
    }, delay)
  }

  return {
    debounce,
  }
}
