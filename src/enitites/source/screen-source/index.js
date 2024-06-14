import {VideoSource} from "@/enitites/source/index.js";


export class Screen extends VideoSource {
    constructor() {
        super(1);
        this.name  =  "screen"
        this.monitor_index = 1
        this.region = {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080
        }
    }

    changeRegion(region)  {
        this.region = region
    }

    changePosition(position) {
        super.changePosition(position)
    }
}