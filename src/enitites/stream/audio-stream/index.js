import {Stream} from "@/enitites/stream/index.js";


export class AudioStream extends Stream {
    constructor() {
        super('audio');
        this.targetStreamName = 'CABLE Input'
        this.streamId = null;
    }

    async init() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        this.streamId = stream.id
        this.addAudioStream(stream)
    }

    getAudioDevices() {
        const stream = super.getStream(this.streamId)
        return stream.getAudioTracks()
    }

    addAudioStream(stream) {
        super.addStream(stream)
    }
}