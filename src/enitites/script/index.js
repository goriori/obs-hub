export class Script {
    constructor(name, path, args, enabled) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.path = path;
        this.args = args;
        this.enabled = enabled
    }
}