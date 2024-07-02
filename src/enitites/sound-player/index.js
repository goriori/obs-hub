class Player {
    constructor() {
    }

    setName(name) {
        this.name = name
    }

}

export class SoundPlayer extends Player {

    constructor() {
        super();
        this.setName('sound_player')
        this.audio_state = 'pause'
        this.source_path = 'sound/tada.mp3'
        this.device_output_index = 4
        this.format = 2
        this.channels = 2
        this.rate = 44100
        this.chunk = 1024
    }
}