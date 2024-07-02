import {Gateway} from "@/enitites/gateway/index.js";

export class VirtualObjectsGateway extends Gateway {
    constructor(store) {
        super();
        this.store = store
    }

    getVirtualObjects() {
        return this.store.getVirtualObjects()
    }

    getVirtualObject(name) {
        return this.store.getVirtualObject(name)
    }

    getVirtualObjectsConfigFormat() {
        const virtualObjects = this.getVirtualObjects()
        const virtualObjectsForConfig = {}
        virtualObjects.forEach(object => {
            virtualObjectsForConfig[object.name] = {...object}
            delete virtualObjectsForConfig[object.name]['name']
        })
        return virtualObjectsForConfig
    }

    addVirtualObject(object) {
        this.store.addVirtualObject(object)
    }
}