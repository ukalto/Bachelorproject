export class ChordSystemSolver {
    constructor(nodesAmount, bitIdentifier, startNode, key, selectedNodes) {
        this.nodesAmount = nodesAmount;
        this.bitIdentifier = bitIdentifier;
        this.startNode = startNode;
        this.key = key;
        this.selectedNodes = selectedNodes;
        this.path = [parseInt(startNode)];
        this.entitiesDict = {};
        this.selectedNodes.forEach((node) => {
            this.entitiesDict[node] = [];
        });
        this.selectedFingerTableEntry = {};
    }

    findSucc(node) {
        const above = this.selectedNodes.filter((i) => node <= i);
        return above.length !== 0 ? Math.min(...above) : this.selectedNodes[0];
    }

    findClosest(list) {
        let curr = [];
        for (let i = 0; i < list.length; i++) {
            const dist = (this.nodesAmount - list[i] + this.key) % this.nodesAmount;
            if (!curr.length || curr[0][1] >= dist) {
                curr = [[list[i], dist], [this.path[this.path.length - 1], i]];
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
        let closest = [];
        for (let i = 0; i < Object.keys(this.entitiesDict).length; i++) {
            try {
                const closestNode = this.findClosest(this.entitiesDict[this.path[i]]);
                const temp = closestNode[0];
                const index = closestNode[1];

                if (!closest.length || closest[1] > temp[1]) {
                    closest = temp;
                    this.selectedFingerTableEntry[index[0]] = index[1];
                    this.path.push(closest[0]);
                }
            } catch (error) {
                this.selectedFingerTableEntry[this.path[this.path.length - 1]] = 0;
                this.path.push(this.entitiesDict[this.path[this.path.length - 1]][0]);
                break;
            }
        }
    }

    solve() {
        this.processEntities();
        this.findPath();
        return ({
            path: this.path,
            tables: this.entitiesDict,
            selectedFingerTableEntries: this.selectedFingerTableEntry
        });
    }
}
