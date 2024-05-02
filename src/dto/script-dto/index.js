import IconCard from "@/components/ui/icon-card/IconCard.vue";
import {shallowRef} from "vue";


export class ScriptSourceDto {
    constructor(data = {
        id: Math.floor(Math.random() * 1000),
        name: '',
        path: '',
        args: {},
        enabled: true
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
            title: this.data.targetForUse.title,
            type: this.data.targetForUse.type,
            component: shallowRef(IconCard),

        }
        const capture = {
            id: randomId,
            title: this.data.targetForCapture.title,
            type: this.data.targetForCapture.type,
            component: this.data.targetForCapture.component,
        }
        const card = this.data?.card

        return new ScriptItem(randomId, use, capture, card,)
    }
}