import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStreamStore = defineStore('streams', () => {
    const streams = ref([])
    const addStream = (stream) => {
        streams.value.push(stream)
    }
    const getStream = (stream) => {
        streams.value.find(strm => strm)
    }
    return {
        streams,
        addStream,
        getStream
    }
})
