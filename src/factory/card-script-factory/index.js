import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";

export class CardScriptFactory {
    #cardsScript;

    constructor() {
        this.#cardsScript = {
            screen: ScriptTargetCard,
            webcam: ScriptTargetCard,
        }
    }

    getScriptCard(typeScript) {
        return this.#cardsScript[typeScript];
    }
}