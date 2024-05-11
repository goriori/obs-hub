import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {insertStart} from "@/utils/helpers/insertStart.js";

export const useResolutionStore = defineStore('resolutionStore', () => {
    const resolutions = ref(['1920 x 1080', '1080 x 1920', '720 x 1080'])
    const targetResolution = ref('1920 x 1080')
    const resolution = computed(() => targetResolution.value.split(' x '))

    const setTargetResolution = ({width, height}) => {
        targetResolution.value = `${width} x ${height}`
        const indexTarget = resolutions.value.indexOf(targetResolution.value)
        resolutions.value = insertStart(resolutions.value, indexTarget)
    }

    return {
        resolutions,
        targetResolution,
        resolution,
        setTargetResolution
    }
})
