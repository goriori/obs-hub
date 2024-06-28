import {Gateway} from "@/enitites/gateway/index.js";
import {AudioDecorator} from "@/enitites/decorator/audio-decorator/index.js";
import {shallowRef} from "vue";
import SoundTargetCard from "@/components/ui/card/sound-target/SoundTargetCard.vue";

export class AudioGateway extends Gateway {
    constructor(audioStore) {
        super();
        this.audioStore = audioStore
    }

    getAudioSources() {
        return this.audioStore.audioSources
    }

    getFocusedAudio() {
        return this.getAudioSources().map(source => source.focused ? source : false).filter(source => source)
    }

    addAudioSource(audioSource) {
        const audioObject = new AudioDecorator(audioSource)
        audioObject.setFocus()
        audioObject.setComponent(shallowRef(SoundTargetCard))
        this.audioStore.addAudioSource(audioObject.getSource())
    }

    deleteAudioSource(id) {
        this.audioStore.deleteAudioSource(id)
    }

    focusAudio(id) {
        this.getAudioSources().find(audio => audio.id === id).focusAudio()
    }

    unFocusAudio(id) {
        this.getAudioSources().find(audio => audio.id === id).unFocusAudio()
    }
}