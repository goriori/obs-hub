import {Source} from "@/enitites/source/index.js";


export class Screen extends Source {
    constructor() {
        super();
        this.id = 1
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
}