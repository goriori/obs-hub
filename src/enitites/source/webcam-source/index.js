import {VideoSource} from "@/enitites/source/index.js";


export class Webcam extends VideoSource {
    constructor() {
        super(2);
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
    changePosition(position) {
        super.changePosition(position);
    }
}