import {Source} from "@/enitites/source/index.js";


export class Webcam extends Source {
    constructor() {
        super();
        this.id = 2
        this.name  =  "webcam"
        this.resolution = {
            width: 1280,
            height: 720
        }
        this.dshow_settings = true
        this.device_index = 0
    }

    changeResolution(resolution) {
        this.resolution = resolution
    }
}