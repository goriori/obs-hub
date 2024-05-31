export class Source {
    constructor(id) {
        this.external_scripts = [];
        this.show = false;
        this['z-index'] = 0
        this.position = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

    }


    addScript(script) {
        this.external_scripts.push(script);
    }

    onShow() {
        this.show = true;
    }

    onHidden() {
        this.show = false;
    }

    changeZIndex(index) {
        this['z-index'] = index;
    }

    changePosition(position) {
        this.position = position;
    }
}