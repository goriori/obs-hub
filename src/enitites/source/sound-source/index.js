import {AudioSource} from "@/enitites/source/index.js";


export class SoundSource extends AudioSource {
    constructor() {
        super(3);
        this.name  =  "sound"
        this.audio_state = 'play'
        this.source_path = 'sound/tada.mp3'
        this.device_output_index = 5
        super.changeRate(44100)
        super.changeChannels(1)
        super.changeChunk(1024)
        super.changeFormat(2)
    }
}