import {VideoDevice} from "@/enitites/video-device/index.js";


export class VirtualCamera extends VideoDevice {
    constructor() {
        super()
        this.changeWidth(1280)
        this.changeHeight(720)
        this.changeFPS(30)
        this.backend = "unitycapture"
        this.device = "Unity Video Capture"
    }
}