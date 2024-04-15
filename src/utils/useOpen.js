import { ref } from 'vue'
export const useOpen = () => {
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  const close = () => {
    isOpen.value = false
  }
  const open = () => {
    if (!isOpen.value) isOpen.value = true
  }
  return { isOpen, close, toggle, open }
}
