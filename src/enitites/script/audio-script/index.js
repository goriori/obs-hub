import {Script} from "@/enitites/script/index.js";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import SoundTargetCard from "@/components/ui/card/sound-target/SoundTargetCard.vue";
import IconCard from "@/components/ui/icon-card/IconCard.vue";


export class AudioScript extends Script {
    constructor(name, path, args, enabled) {
        super(name, path, args, enabled);
    }
}