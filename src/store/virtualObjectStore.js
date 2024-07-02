import {defineStore} from "pinia";
import {ref} from "vue";
import {VirtualObjectsGateway} from "@/enitites/gateway/virtual-objects-gateway/index.js";


const virtualObjectStore = defineStore('virualObjects', () => {
    const virtualObjects = ref([])
    const addVirtualObject = (object) => virtualObjects.value.push(object)
    const getVirtualObject = (name) => virtualObjects.value.find(object => object.name === name)
    const getVirtualObjects = () => virtualObjects.value
    return {
        virtualObjects,
        addVirtualObject,
        getVirtualObject,
        getVirtualObjects,
    }
})


export const useVirtualObjectsGateway = () => {
    return new VirtualObjectsGateway(virtualObjectStore())
}