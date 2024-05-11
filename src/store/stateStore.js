import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStateStore = defineStore('stateStore', () => {
    const isLoading = ref(false)
    const modals = ref({
        selectSource: {
            targetFile:null,
            show: false,
        },
        delete: {
            deleteSourceVideo: {
                show: false,
            },
            deleteScript: {
                show: false,
            },
            deleteAudio: {
                show: false,
            }
        }

    })
    return {
        isLoading,
        modals
    }
})
