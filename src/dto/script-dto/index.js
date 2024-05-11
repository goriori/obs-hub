import IconCard from "@/components/ui/icon-card/IconCard.vue";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import Source from "@/components/ui/source/Source.vue";
import {generateRandomId} from "@/utils/helpers/randomId.js";


export class ScriptSourceDto {
    constructor(data = {
        id: Math.floor(Math.random() * 1000),
        name: '',
        path: '',
        args: {},
        enabled: false
    }) {
        this.id = data?.id;
        this.name = data?.name;
        this.path = data.path;
        this.args = data.args;
        this.enabled = data.enabled
    }
}

class ScriptItem {
    constructor(id, name, use, capture, card) {
        this.id = id;
        this.name = name;
        this.use = use;
        this.capture = capture;
        this.component = card
        this.isFocus = false
        this.isActive = false
    }


}

export class ScriptDto {
    constructor(data = {
        name: '',
        path: '',
        targetForUse: null,
        targetForCapture: null,
        card: null,
    }) {
        this.data = data
        this.id = data.id || generateRandomId()
        this.name = this.data?.name || 'Новый скрипт'
        this.use = {
            id: generateRandomId(),
            title: this.data?.targetForUse?.title || 'Захват веб-камеры',
            type: this.data?.targetForUse?.type || 'camera',
            component: shallowRef(IconCard),
        }
        this.capture = {
            id: generateRandomId(),
            title: this.data?.targetForCapture?.title || 'Захват веб-камеры',
            type: this.data?.targetForCapture?.type || 'webcam',
            component: this.data?.targetForCapture?.component || shallowRef(Source),
        }
        this.card = this.data?.card || shallowRef(ScriptTargetCard)
    }

    getScript() {
        return new ScriptItem(this.id,this.name, this.use, this.capture, this.card)
    }
}