import {Script} from "@/enitites/script/index.js";


export class VideoScript extends Script {
    constructor(name, path, args, sourceName, enabled) {
        super(name, path, args, sourceName, enabled);
    }

    activeScript() {
        super.activeScript();
    }
    disableScript() {
        super.disableScript();
    }
}