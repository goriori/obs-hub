import {VirtualCamera} from "@/enitites/video-device/virtual-camera/index.js";
import {VirtualAudio} from "@/enitites/audio-device/virtual-audio/index.js";

class VirtualObjectFactory {
    constructor() {
        this.virtualObjects = {
            'virtual_camera': () => new VirtualCamera(),
            'virtual_audio': () => new VirtualAudio()
        }
    }

    getVirtualObject(name) {
        return this.virtualObjects[name]()
    }
}

export default new VirtualObjectFactory()