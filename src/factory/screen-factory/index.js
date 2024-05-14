import {CardFactory} from "@/factory/card-factory/index.js";

const cardFactory = new CardFactory();

const buildPositionApplication = (position, positionApplication, resolutionApplication) => {
    return {
        x: (position.x * positionApplication.width) / resolutionApplication[0] || 0,
        y: (position.y * positionApplication.height) / resolutionApplication[1] || 0,
        width: (position.width * positionApplication.width) / resolutionApplication[0] || 0,
        height: (position.height * positionApplication.height) / resolutionApplication[1] || 0
    }
}

class WebCam {
    constructor(position, positionApplication, resolution, region, resolutionApplication) {
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
            width: resolution?.width || 1280,
            height: resolution?.height || 720
        }
        this.position = {
            x: position?.x || 0,
            y: position?.y || 0,
            width: position?.width || 640,
            height: position?.height || 340
        }
        this.positionApplication = buildPositionApplication(position, positionApplication, resolutionApplication)
        this["z-index"] = 2
        this.dshow_settings = true
        this.component = cardFactory.getCard(this.type)

    }

}


class Screen {
    constructor(position, positionApplication, resolution, region, resolutionApplication) {
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
            x: region?.x || 0,
            y: region?.y || 0,
            width: region?.width || 1920,
            height: region?.height || 1080
        }
        this.position = {
            x: position?.x || 0,
            y: position?.y || 0,
            width: position?.width || 1920,
            height: position?.height || 1080
        }
        this.positionApplication = buildPositionApplication(position, positionApplication, resolutionApplication)
        this["z-index"] = 1
        this.component = cardFactory.getCard(this.type)
    }
}

export class ScreenFactory {
    static getSource(sourceType, options) {
        console.log('options', options)
        const sources = {
            webcam: new WebCam(
                options?.position,
                options?.positionApplication,
                options?.resolution,
                options?.region,
                options?.resolutionApplication
            ),
            screen: new Screen(
                options?.position,
                options?.positionApplication,
                options?.resolution,
                options?.region,
                options?.resolutionApplication
            ),
        }
        return sources[sourceType]
    }
}