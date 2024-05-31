export class VideoDevice {
    constructor() {
        this.external_scripts = [];
        this.width = 0;
        this.height = 0;
        this.fps = 0;
    }


    addScript(script) {
        this.external_scripts.push(script);
    }

    changeWidth(width) {
        this.width = width;
    }

    changeHeight(height) {
        this.height = height;
    }

    changeFPS(fps) {
        this.fps = fps;
    }
}