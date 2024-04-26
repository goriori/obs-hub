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

        }
        const capture = {
            id: randomId,
            title: this.data.targetForCapture.title,
            type: this.data.targetForCapture.type,
        }
        const card = this.data?.card
        return new ScriptItem(randomId, use, capture, card)
    }
}