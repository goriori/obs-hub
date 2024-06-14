import {defineStore} from 'pinia'
import {ref} from 'vue'
import {ScriptGateway} from "@/enitites/gateway/scripts-gateway/index.js";

const useScriptStore = defineStore('scriptStore', () => {
    const scripts = ref([])
    const addScript = (script) => {
        scripts.value.push(script)
    }
    const getScript = (id) => {
       return scripts.value.find(script => script.id === id)
    }
    const deleteScript = (name) => {
        scripts.value = scripts.value.filter(script => script.name !== name)
    }
    return {
        scripts,
        addScript,
        getScript,
        deleteScript
    }
})


export const useScriptGateway = () => {
    return new ScriptGateway(useScriptStore())
}
