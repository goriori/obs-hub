export class SourceGateway {
    constructor(sourceStore) {
        this.sourceGateway = sourceStore;
    }

    addSource(source)  {
        return this.sourceGateway.addSource(source);
    }
    getSource(id) {
        return this.sourceGateway.getSource(id);
    }
    getSources()  {
        return this.sourceGateway.getSources();
    }
}