

export class Stream {
    constructor() {
        this.streams = new Map();
    }

    addStream(stream) {
        this.streams.set(stream.id, stream);
    }
    getStream(id){
        return this.streams.get(id);
    }
    removeStream(stream)  {
        this.streams.delete(stream.id);
    }
}