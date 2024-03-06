export class Node {
    constructor(identifier) {
        this.identifier = identifier;
        this.parent = null;
        this.children = [];
    }
}
