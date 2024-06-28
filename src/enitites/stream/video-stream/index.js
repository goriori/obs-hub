import {Stream} from "@/enitites/stream/index.js";


export class VideoStream extends Stream {
    constructor() {
        super('video');
        this.targetStreamName = 'Streamer'
        this.streamId = null;
    }

    async init() {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const streamerDevice = devices.find(device => device.label === this.targetStreamName)
        const stream = !streamerDevice ? await this.getPermissionVideoCapture(devices) : await this.loadVideoStream(streamerDevice)
        this.streamId = stream.id
        this.addStream(stream)
        return stream

    }

    async loadVideoStream(device) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: device.deviceId,
            }
        })
        return stream
    }

    async getPermissionVideoCapture(devices) {
        const videoInput = devices.find(device => device.kind === 'videoinput')
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: videoInput.deviceId,
            }
        })
        window.location.reload()
        return stream
    }

    async stopStream() {
        await this.getStream(this.streamId).getTracks().forEach(track => track.stop())
    }
}