
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useResolutionStore = defineStore('resolutionStore', () => {
    const resolutions = ref(['1920 x 1080', '1080 x 1920', '720 x 1080'])
    const targetResolution = ref('1920 x 1080')
    return {
        resolutions,
        targetResolution
    }
})
