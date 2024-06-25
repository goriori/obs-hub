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
    const hiddenSource = (sourceName) => {
        sources.value.find(source => source.name === sourceName).onHidden()
    }
    const showSource = (sourceName) => {
        sources.value.find(source => source.name === sourceName).onShow()
    }
    const removeSource = (sourceName) => {
        sources.value = sources.value.filter(source => source.name !== sourceName)
    }


    return {
        sources,
        getSource,
        getSources,
        hiddenSource,
        showSource,
        addSource,
        changeList,
        removeSource,
    }
})

export const useSourceGateway = () => {
    return new SourceGateway(sourceStore())
}

