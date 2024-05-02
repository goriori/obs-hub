import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import {shallowRef} from "vue";

export class CardScriptFactory {
    #cardsScript;

    constructor() {
        this.#cardsScript = {
            screen: shallowRef(ScriptTargetCard),
            webcam: shallowRef(ScriptTargetCard),
        }
    }

    getScriptCard(typeScript) {
        return this.#cardsScript[typeScript];
    }
}