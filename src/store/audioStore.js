import {defineStore} from 'pinia'
import {ref} from 'vue'
import {AudioGateway} from "@/enitites/gateway/audio-gateway/index.js";

 const useAudioStore = defineStore('audioStore', () => {
    const audioSources = ref([])
    const addAudioSource = (audio) => {
        audioSources.value.push(audio)
    }
    const deleteAudioSource = (id) => {
        audioSources.value = audioSources.value.filter(audio => audio.id !== id)
    }
    return {
        audioSources,
        addAudioSource,
        deleteAudioSource
    }
})


export const useAudioGateway = () => {
    return new AudioGateway(useAudioStore())
}