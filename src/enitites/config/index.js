export class Config {
    constructor() {
        this.config = null
        this.requiredFields = ['virtual_camera', 'video_sources']
    }

    getConfig() {
        return this.config
    }

    buildConfig(config) {
        if (!this.requiredFields[0] in config) return false
        if (!this.requiredFields[1] in config) return false
        this.config = config
    }
}