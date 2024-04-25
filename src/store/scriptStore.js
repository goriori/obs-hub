import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useScriptStore = defineStore('scriptStore', () => {
    const script = ref([])
    const addScript = (script) => {
        script.value.push(script)
    }
    return {
        script,
        addScript
    }
})
