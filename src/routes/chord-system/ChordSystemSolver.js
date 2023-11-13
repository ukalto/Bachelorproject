export class ChordSystemSolver {
    constructor(nodesAmount, bitIdentifier, startNode, key, selectedNodes) {
        this.nodesAmount = nodesAmount;
        this.bitIdentifier = bitIdentifier;
        this.startNode = startNode;
        this.key = key;
        this.selectedNodes = selectedNodes;
        this.path = [startNode];
        this.entitiesDict = {};
        this.selectedNodes.forEach((node) => {
            this.entitiesDict[node] = [];
        });
    }

    findSucc(node) {
        const above = this.selectedNodes.filter((i) => node <= i);
        return above.length !== 0 ? Math.min(...above) : this.selectedNodes[0];
    }

    findClosest(list) {
        let curr = [];
        for (let i = 0; i < list.length; i++) {
            const dist = (this.nodesAmount - list[i] + this.key) % this.nodesAmount;
            if (!curr.length || curr[1] > dist) {
                curr = [list[i], dist];
            }
        }
        return curr;
    }

    processEntities() {
        for (const node of this.selectedNodes) {
            const nodes = [];
            for (let i = 1; i <= this.bitIdentifier; i++) {
                nodes.push(this.findSucc((node + 2 ** (i - 1)) % this.nodesAmount));
            }
            this.entitiesDict[node] = nodes;
        }
    }

    findPath() {
        if (this.key && this.startNode) {
            let closest = [];

            for (let i = 0; i < Object.keys(this.entitiesDict).length; i++) {
                try {
                    const temp = this.findClosest(this.entitiesDict[this.path[i]]);

                    if (!closest.length || closest[1] > temp[1]) {
                        closest = temp;
                        this.path.push(closest[0]);
                    }
                } catch (error) {
                    this.path.push(this.entitiesDict[this.path[this.path.length - 1]][0]);
                    break;
                }
            }
        }
    }

    solve() {
        this.processEntities();
        this.findPath();
        return ({
            path: this.path,
            tables: this.entitiesDict
        });
    }
}
