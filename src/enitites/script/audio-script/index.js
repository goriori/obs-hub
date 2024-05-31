import {Script} from "@/enitites/script/index.js";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import SoundTargetCard from "@/components/ui/card/sound-target/SoundTargetCard.vue";


export class AudioScript extends Script {
    constructor(capture, card) {
        super();
        this.use = shallowRef(SoundTargetCard)
        this.capture = capture
        this.card = card || shallowRef(ScriptTargetCard)
    }
}