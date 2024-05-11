import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAudioStore = defineStore('audioStore', () => {
    const audioSource = ref([])
    const addAudioSource = (audio) => {
        audioSource.value.push(audio)
    }
    const deleteAudioSource = (id) => {
        audioSource.value = audioSource.value.filter(audio => audio.id !== id)
    }
    return {
        audioSource,
        addAudioSource,
        deleteAudioSource
    }
})
