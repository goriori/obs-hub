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

    addVirtualCamera(virtualCamera) {
        this.config.virtual_camera = virtualCamera
    }

    addVirtualAudio(virtualAudio) {
        this.config.virtual_audio = virtualAudio
    }

    changeUpdateType(type) {
        if (this.#updateTypes.includes(type)) this.update_type = type
    }

    changeUpdateAspects(aspects) {
        this.update_aspects = aspects
    }


}

export default new ServerConfig()