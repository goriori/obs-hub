import ScreenTargetCard from "@/components/ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";
import {shallowRef} from "vue";
import SoundTargetCard from "@/components/ui/card/sound-target/SoundTargetCard.vue";

class CardFactory {
    #cards;

    constructor() {
        this.#cards = {
            screen: shallowRef(ScreenTargetCard),
            webcam: shallowRef(CameraTargetCard),
            sound: shallowRef(SoundTargetCard),
            system_sound: shallowRef(SoundTargetCard),
            microphone: shallowRef(SoundTargetCard)
        }
    }

    getCard(typeCard) {
        return this.#cards[typeCard];
    }
}

export default new CardFactory()