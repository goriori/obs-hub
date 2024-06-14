import {AudioSource} from "@/enitites/source/index.js";


export class SystemSoundSource extends AudioSource {
    constructor() {
        super(2);
        this.name  =  "system_sound"
        this.device_input_index = -1
        this.device_output_index = 5
        super.changeRate(48000)
        super.changeChannels(2)
        super.changeChunk(2048)
        super.changeFormat(3)
    }
}