import {CardFactory} from "@/factory/card-factory/index.js";

const cardFactory = new CardFactory();

class WebCam {
    constructor() {
        const randomId = Math.floor(Math.random() * 1000)
        this.id = randomId
        this.title = `webcam-${randomId}`
        this.type = 'webcam'
        this.selector = `webcam-${randomId}`
        this.isFocus = false
        this.isActive = false
        this.show = true
        this.external_scripts = [
            {
                "name": "Mask",
                "path": "external_scripts/mask.py",
                "enabled": true,
                "args": {}
            }
        ]
        this.device_index = 0
        this.resolution = {
            width: 1280,
            height: 720
        }
        this.position = {
            x: 0,
            y: 0,
            width: 640,
            height: 360
        }
        this["z-index"] = 2
        this.dshow_settings = true
        this.component = cardFactory.getCard(this.type)

    }

}


class Screen {
    constructor() {
        const randomId = Math.floor(Math.random() * 1000)
        this.id = randomId
        this.title = `screen-${randomId}`
        this.type = 'screen'
        this.selector = `screen-${randomId}`
        this.isFocus = false
        this.isActive = false
        this.show = true
        this.external_scripts = {}
        this.monitor_index = 1
        this.region = {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080
        }
        this.position = {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080
        }
        this["z-index"] = 1
        this.component = cardFactory.getCard(this.type)
    }
}

export class ScreenFactory {
    static getSource(sourceType) {
        const sources = {
            webcam: new WebCam(),
            screen: new Screen(),
        }
        return sources[sourceType]
    }
}