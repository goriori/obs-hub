import {AudioDevice} from "@/enitites/audio-device/index.js";

export class VirtualAudio extends AudioDevice {
    constructor() {
        super();
        this.setName('virtual_audio')
    }

}