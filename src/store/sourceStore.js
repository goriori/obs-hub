import {defineStore} from "pinia";
import {ref} from "vue";
import {SourceGateway} from "@/enitites/gateway/sources-gateway/index.js";


const sourceStore = defineStore('sources', () => {
    const sources = ref([])
    const addSource = (source) => {
        sources.value.push(source)
    }

    const getSources = (type) => sources.value.filter(source => source.type_source === type)


    const getSource = (name) => sources.value.find(source => source.name === name)

    const changeList = (newList) => {
        sources.value = newList
    }

    const removeSource = (source) => {
        sources.value = sources.value.filter(s => s.id !== source.id)
    }


    return {
        sources,
        getSource,
        getSources,
        addSource,
        changeList,
        removeSource,
    }
})

export const useSourceGateway = () => {
    return new SourceGateway(sourceStore())
}

