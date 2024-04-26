import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAudioStore = defineStore('audioStore', () => {
    const audioSource = ref([])
    const addAudioSource = (script) => {
        console.log(script)
        audioSource.value.push(script)
    }
    const deleteAudioSource = (id) => {
        audioSource.value = audioSource.value.filter(script => script.id !== id)
    }
    return {
        audioSource,
        addAudioSource,
        deleteAudioSource
    }
})
