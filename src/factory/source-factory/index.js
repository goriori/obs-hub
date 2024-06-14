import {Webcam} from "@/enitites/source/webcam-source/index.js";
import {Screen} from "@/enitites/source/screen-source/index.js";
import {MicrophoneSource} from "@/enitites/source/microphone-source/index.js";
import {SoundSource} from "@/enitites/source/sound-source/index.js";
import {SystemSoundSource} from "@/enitites/source/system-sound-source/index.js";

class SourceFactory {
    constructor() {
        this.sources = {
            'webcam': () => new Webcam(),
            'screen': () => new Screen(),
            'microphone': () => new MicrophoneSource(),
            'sound': () => new SoundSource(),
            'system_sound': () => new SystemSoundSource()
        }
    }

    getSource(source) {
        return this.sources[source]()
    }
}

export default new SourceFactory()