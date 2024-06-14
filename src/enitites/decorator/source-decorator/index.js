import {Decorator} from "@/enitites/decorator/index.js";

export class SourceDecorator extends Decorator {
    constructor(source) {
        super(source);
        this.source = source
    }

    getSource() {
        return this.source
    }

    setComponent(component) {
        this.source.component = component
    }

    setFocus() {
        this.source.isFocus = false
    }
}