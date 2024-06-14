import {Gateway} from "@/enitites/gateway/index.js";
import {VideoScript} from "@/enitites/script/video-script/index.js";
import {shallowRef} from "vue";
import Source from "@/components/ui/source/Source.vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import CaptureCamera from "@/components/icons/CaptureCamera.vue";
import {ScriptDecorator} from "@/enitites/decorator/script-decorator/index.js";

export class ScriptGateway extends Gateway {
    constructor(scriptsStore) {
        super();
        this.scriptsStore = scriptsStore
    }

    getScripts() {
        return this.scriptsStore.scripts
    }

    addScript(script) {
        const {name, args, path, enabled} = script
        const scriptObject = new ScriptDecorator(new VideoScript(name, path, args, enabled))
        scriptObject.setUse('Захват веб-камеры', 'camera', shallowRef(Source))
        scriptObject.setCapture('Захват веб-камеры', 'webcam', shallowRef(CaptureCamera))
        scriptObject.setCard(shallowRef(ScriptTargetCard))
        scriptObject.setFocused()
        this.scriptsStore.addScript(scriptObject.getScript())
    }

    activeScript(id) {
        const script = this.scriptsStore.getScript(id)
        script.enabled = true
    }

    disableScript(id) {
        const script = this.scriptsStore.getScript(id)
        script.enabled = false
    }

    deleteScript(name) {
        this.scriptsStore.deleteScript(name)
    }
}