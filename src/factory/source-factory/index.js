import {Webcam} from "@/enitites/source/webcam-source/index.js";
import {Screen} from "@/enitites/source/screen-source/index.js";

class SourceFactory {
    constructor() {
        this.sources = {
            'webcam': () => new Webcam(),
            'screen': () => new Screen(),
        }
    }

    getSource(source) {
        return this.sources[source]()
    }
}

export default new SourceFactory()