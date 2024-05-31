import {Script} from "@/enitites/script/index.js";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";


export class VideoScript extends Script {
    constructor(capture, card) {
        super();
        this.use = shallowRef(CameraTargetCard)
        this.capture = capture
        this.card = card || shallowRef(ScriptTargetCard)
    }
}