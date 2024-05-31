import {defineStore} from "pinia";
import {ref} from "vue";
import {SourceGateway} from "@/enitites/gateway/sources-gateway/index.js";


const sourceStoreNew = defineStore('sources', () => {
    const sources = ref([])
    const addSource = (source) => {
        sources.value.push(source)
    }

    const getSources =  ()  => sources.value

    const getSource = (id) => sources.value.find(source => source.id === id)

    const removeSource = (source) => {
        sources.value = sources.value.filter(s => s.id !== source.id)
    }

    return {
        sources,
        getSource,
        getSources,
        addSource,
        removeSource
    }
})

export const useSourceGateway = () => {
    return new SourceGateway(sourceStoreNew())
}

