import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useScriptStore = defineStore('scriptStore', () => {
    const scripts = ref([])
    const addScript = (script) => {
        scripts.value.push(script)
    }
    const deleteScript = (name) => {
        scripts.value = scripts.value.filter(script => script.name !== name)
    }
    return {
        scripts,
        addScript,
        deleteScript
    }
})
