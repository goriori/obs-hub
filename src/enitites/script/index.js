export class Script {
    constructor(name, path, args, sourceName, enabled) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.path = path;
        this.args = args;
        this.sourceName = sourceName
        this.enabled = enabled
    }
}