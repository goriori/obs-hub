import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStateStore = defineStore('stateStore', () => {
    const isLoading = ref(false)
    const modals = ref({
        selectSource: {
            show: false,
        },
    })
    return {
        isLoading,
        modals
    }
})
