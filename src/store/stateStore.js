import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStateStore = defineStore('stateStore', () => {
    const isLoading = ref(false)
    const modals = ref({
        selectSource: {
            use: null,
            targetFile: null,
            show: false,
        },
        edit: {
            editScript: {
                scriptTarget: null,
                show: false,
            }
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
        },
        message: {
            warning: {
                show: false,
                message: '',
                onShow(message) {
                    this.show = true
                    this.message = message
                    setTimeout(() => {
                        this.show = false
                    }, 3000)
                }
            },
            error: {
                show: false,
                message: '',
                onShow(message) {
                    this.show = true
                    this.message = message
                    setTimeout(() => {
                        this.show = false
                    }, 3000)
                }
            }
        }

    })
    return {
        isLoading,
        modals
    }
})
