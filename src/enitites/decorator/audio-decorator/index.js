export class AudioDecorator {
    constructor(audio) {
        this.audio = audio
    }

    getSource() {
        return this.audio
    }

    setComponent(component) {
        this.audio.component = component
    }

    setFocus() {
        this.audio.focused = false
        this.audio.focusAudio = function () {
            this.focused = true
        }
        this.audio.unFocusAudio = function () {
            this.focused = false
        }
    }
}