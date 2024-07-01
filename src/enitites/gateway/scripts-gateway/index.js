import {Gateway} from "@/enitites/gateway/index.js";
import {VideoScript} from "@/enitites/script/video-script/index.js";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import CaptureCamera from "@/components/icons/CaptureCamera.vue";
import {ScriptDecorator} from "@/enitites/decorator/script-decorator/index.js";
import IconCard from "@/components/ui/icon-card/IconCard.vue";

export class ScriptGateway extends Gateway {
    constructor(scriptsStore) {
        super();
        this.scriptsStore = scriptsStore
    }

    getScripts() {
        return this.scriptsStore.scripts
    }

    getFocusedScript() {
        return this.scriptsStore.scripts.map(script => script.focused ? script : false).filter(script => script)
    }

    addScript(script) {
        const {name, args, path, sourceName, enabled} = script
        const scriptObject = new ScriptDecorator(new VideoScript(name, path, args, sourceName, enabled))
        scriptObject.setUse('Захват веб-камеры', 'camera', shallowRef(IconCard))
        scriptObject.setCapture('Захват веб-камеры', 'webcam', shallowRef(CaptureCamera))
        scriptObject.setComponent(shallowRef(ScriptTargetCard))
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
        const script = this.scriptsStore.getScript(id)
        script.focusScript()
    }

    unFocusScript(id) {
        this.scriptsStore.getScript(id).unFocusScript()
    }

    deleteScript(name) {
        this.scriptsStore.deleteScript(name)
    }
}