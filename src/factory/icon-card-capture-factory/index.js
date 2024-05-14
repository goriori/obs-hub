import {shallowRef} from "vue";
import Camera from "@/components/icons/Camera.vue";
import Screen from "@/components/icons/Screen.vue";
import Sound from "@/components/icons/Sound.vue";


export class CardCaptureFactory {
    constructor() {
        this.cards = {
            webcam: shallowRef(Camera),
            screen:  shallowRef(Screen),
            all: shallowRef(Screen),
            sound:  shallowRef(Sound)
        };
    }
    getCard(type) {
        return this.cards[type];
    }
}