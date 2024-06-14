import {Decorator} from "@/enitites/decorator/index.js";


export class ScriptDecorator extends Decorator {
    constructor(script) {
        super(script);
        this.script = script
    }

    getScript() {
        return this.script
    }

    setUse(title, type, component) {
        this.script.use = {title, type, component}
    }

    setCapture(title, type, component) {
        this.script.capture = {title, type, component}
    }

    setCard(card) {
        this.script.card = card
    }

    setFocused() {
        this.script.focused = false
    }
}