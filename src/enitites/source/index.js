export class VideoSource {
    constructor(id) {
        this.id = id
        this.type_source = 'video'
        this.external_scripts = [];
        this.show = false;
        this['z-index'] = 0
        this.position = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        this.positionApplication = {...this.position}
    }

    addScript(script) {
        this.external_scripts.push(script);
    }

    onShow() {
        this.show = true;
    }

    onHidden() {
        this.show = false;
    }

    changeZIndex(index) {
        this['z-index'] = index;
    }

    changePosition(position) {
        Object.assign(this.position, position);
    }

    changePositionApplication(position) {
        Object.assign(this.positionApplication, position)
    }
}

export class AudioSource {
    constructor(id) {
        this.id = id
        this.type_source = 'audio'
        this.external_scripts = [];
        this.show = false;
        this.rate = 441000
        this.chunk = 1024
        this.format = 2
        this.channels = 1
    }

    onShow() {
        this.show = true;
    }

    onHidden() {
        this.show = false;
    }

    addScript(script) {
        this.external_scripts.push(script);
    }

    changeFormat(format) {
        this.format = format
    }

    changeRate(rate) {
        this.rate = rate
    }

    changeChannels(channels) {
        this.channels = channels
    }

    changeChunk(chunk) {
        this.chunk = chunk
    }
}