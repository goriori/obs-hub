class ServerConfig {
    #updateTypes

    constructor() {
        this.#updateTypes = ['fast', 'full']
        this.update_aspects = []
        this.update_type = 'fast'
        this.config = {}
    }

    addVideSources(videoSources) {
        this.config.video_sources = videoSources
    }

    addAudioSources(audioSource) {
        this.config.audio_sources = audioSource
    }

    addPlayer(player) {
        Object.assign(this.config, player)
    }

    addVirtualObjects(objects) {
        Object.assign(this.config, objects)
    }

    changeUpdateType(type) {
        if (this.#updateTypes.includes(type)) this.update_type = type
    }

    changeUpdateAspects(aspects) {
        this.update_aspects = aspects
    }


}

export default new ServerConfig()