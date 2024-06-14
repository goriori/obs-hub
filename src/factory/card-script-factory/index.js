import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import {shallowRef} from "vue";

 class CardScriptFactory {
    #cardsScript;

    constructor() {
        this.#cardsScript = {
            screen: shallowRef(ScriptTargetCard),
            webcam: shallowRef(ScriptTargetCard),
        }
    }

    getCard(typeScript) {
        return this.#cardsScript[typeScript];
    }
}

export default new CardScriptFactory()