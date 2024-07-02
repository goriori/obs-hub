import {SourceDecorator} from "@/enitites/decorator/source-decorator/index.js";
import CardFactory from "@/factory/card-factory/index.js";

export class SourceGateway {
    constructor(sourceStore) {
        this.applicationFields = ['component', 'type_source', 'positionApplication', 'isFocus', 'name']
        this.sourceGateway = sourceStore;
    }

    addSource(source) {
        const sourceObject = new SourceDecorator(source)
        sourceObject.setComponent(CardFactory.getCard(source.name))
        sourceObject.setFocus()
        return this.sourceGateway.addSource(sourceObject.getSource());
    }

    getSource(name) {
        return this.sourceGateway.getSource(name);
    }

    getVideoSources() {
        return this.sourceGateway.getSources('video');
    }

    getNameVideoSources() {
        return this.sourceGateway.getSources('video').map(source => source.name)
    }

    getAudioSources() {
        return this.sourceGateway.getSources('audio')
    }

    getNameAudioSources() {
        return this.sourceGateway.getSources('audio').map(source => source.name)
    }

    getVideoSourcesObject() {
        const video_sources = {}
        const videoSources = this.sourceGateway.getSources('video');
        videoSources.forEach(source => {
            video_sources[source.name] = {...this.#clearFieldsApplication(JSON.parse(JSON.stringify(source)))}
        })
        return video_sources
    }

    getAudioSourcesObject() {
        const audio_sources = {}
        const audioSources = this.sourceGateway.getSources('audio')
        audioSources.forEach(source => {
            audio_sources[source.name] = {...this.#clearFieldsApplication(JSON.parse(JSON.stringify(source)))}
        })
        return audio_sources
    }

    changeList(list, type) {
        const listType = {
            video: this.getAudioSources(),
            audio: this.getVideoSources()
        }
        const rebuildList = [...list, ...listType[type]]
        this.sourceGateway.changeList(rebuildList)
    }

    activeSourceScript(sourceName, nameScript) {
        this.sourceGateway.getSource(sourceName).activeScript(nameScript)
    }

    disabledSourceScript(sourceName, nameScript) {
        this.sourceGateway.getSource(sourceName).disabledScript(nameScript)
    }

    focusSource(id) {
        this.sourceGateway.getSource(id).focusSource()
    }

    unFocusSource(id) {
        this.sourceGateway.getSource(id).unFocusSource()
    }

    hiddenVideoSource(sourceName) {
        this.sourceGateway.hiddenSource(sourceName)
    }

    showSource(sourceName) {
        this.sourceGateway.showSource(sourceName)
    }

    removeSource(sourceName) {
        this.sourceGateway.removeSource(sourceName)
    }

    #clearFieldsApplication(source) {
        const keysSource = Object.keys(source)
        this.applicationFields.forEach(field => {
            if (keysSource.includes(field)) delete source[field]
        })
        return source
    }
}