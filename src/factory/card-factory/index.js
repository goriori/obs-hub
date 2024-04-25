import ScreenTargetCard from "@/components/ui/card/screen-target/ScreenTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";

export class CardFactory {
    #cards;

    constructor() {
        this.#cards = {
            screen: ScreenTargetCard,
            webcam: CameraTargetCard
        }
    }

    getCard(typeCard) {
        return this.#cards[typeCard];
    }
}