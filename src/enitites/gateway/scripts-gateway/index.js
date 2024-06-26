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
        const {name, args, path, sourceName, enabled} = script
        const scriptObject = new ScriptDecorator(new VideoScript(name, path, args, sourceName, enabled))
        scriptObject.setUse('Захват веб-камеры', 'camera', shallowRef(Source))
        scriptObject.setCapture('Захват веб-камеры', 'webcam', shallowRef(CaptureCamera))
        scriptObject.setCard(shallowRef(ScriptTargetCard))
        scriptObject.setFocused()
        this.scriptsStore.addScript(scriptObject.getScript())
    }

    activeScript(id) {
        const script = this.scriptsStore.getScript(id)
        script.activeScript()
        return {sourceName: script.sourceName, scriptName: script.name}
    }

    disableScript(id) {
        const script = this.scriptsStore.getScript(id)
        script.disableScript()
        return {sourceName: script.sourceName, scriptName: script.name}
    }

    focusScript(id) {
       const script =  this.scriptsStore.getScript(id)
        script.focusScript()
        console.log(script)
    }

    unFocusScript(id) {
        this.scriptsStore.getScript(id).unFocusScript()
    }

    deleteScript(name) {
        this.scriptsStore.deleteScript(name)
    }
}