import {AudioSource} from "@/enitites/source/index.js";


export class MicrophoneSource extends AudioSource {
    constructor() {
        super(1);
        this.name  =  "microphone"
        this.device_input_index = 1
        this.device_output_index = 5
        super.changeRate(44100)
        super.changeChannels(1)
        super.changeChunk(1024)
        super.changeFormat(2)
    }
}