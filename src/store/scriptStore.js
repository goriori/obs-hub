import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useScriptStore = defineStore('scriptStore', () => {
    const scripts = ref([])
    const addScript = (script) => {
        scripts.value.push(script)
    }
    const deleteScript = (id) => {
        scripts.value = scripts.value.filter(script => script.id !== id)
    }
    return {
        scripts,
        addScript,
        deleteScript
    }
})
