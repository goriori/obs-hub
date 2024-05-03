import IconCard from "@/components/ui/icon-card/IconCard.vue";
import {shallowRef} from "vue";
import ScriptTargetCard from "@/components/ui/card/script-target/ScriptTargetCard.vue";
import Source from "@/components/ui/source/Source.vue";


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
    constructor(id, use, capture, card) {
        this.id = id;
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
    }

    getScript() {
        const randomId = Math.floor(Math.random() * 1000)
        const use = {
            id: randomId,
            title: this.data?.targetForUse?.title || 'Захват веб-камеры',
            type: this.data?.targetForUse?.type || 'camera',
            component: shallowRef(IconCard),
        }
        const capture = {
            id: randomId,
            title: this.data?.targetForCapture?.title || 'Захват веб-камеры',
            type: this.data?.targetForCapture?.type || 'webcam',
            component: this.data?.targetForCapture?.component || shallowRef(Source) ,
        }
        const card = this.data?.card || shallowRef(ScriptTargetCard)

        return new ScriptItem(randomId, use, capture, card)
    }
}