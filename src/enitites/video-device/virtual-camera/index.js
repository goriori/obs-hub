import {VideoDevice} from "@/enitites/video-device/index.js";


export class VirtualCamera extends VideoDevice {
    constructor() {
        super()
        this.changeWidth(1920)
        this.changeHeight(1080)
        this.changeFPS(30)
        this.backend = "unitycapture"
        this.device = "Unity Video Capture"
    }
}