import ScreenTargetCard from "@/components/ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";
import {shallowRef} from "vue";

export class CardFactory {
    #cards;

    constructor() {
        this.#cards = {
            screen: shallowRef(ScreenTargetCard),
            webcam: shallowRef(CameraTargetCard)
        }
    }

    getCard(typeCard) {
        return this.#cards[typeCard];
    }
}