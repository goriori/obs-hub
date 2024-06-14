import {Script} from "@/enitites/script/index.js";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import CameraTargetCard from "@/components/ui/card/camera-target/CameraTargetCard.vue";
import {generateRandomId} from "@/utils/helpers/randomId.js";
import IconCard from "@/components/ui/icon-card/IconCard.vue";
import Source from "@/components/ui/source/Source.vue";
import Camera from "@/components/icons/Camera.vue";


export class VideoScript extends Script {
    constructor(name, path, args, enabled) {
        super(name, path, args, enabled);

    }
}