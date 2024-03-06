export class PolymorphPolyringSolver {
    constructor(graph, pathNodes) {
        this.graph = graph;
        this.startGuid = pathNodes[0];
        this.endGuid = pathNodes[1];
    }

    calculateMatchingCoordinates(guid1, guid2) {
        const coords1 = guid1.split('.');
        const coords2 = guid2.split('.');

        let matchingCoords = 0;
        for (let i = 0; i < Math.min(coords1.length, coords2.length); i++) {
            if (coords1[i] === coords2[i]) {
                matchingCoords += 1;
            } else {
                break;
            }
        }
        return matchingCoords;
    }

    findNodeByPrefix(graph, prefix) {
        for (let node of graph) {
            if (node.identifier.startsWith(prefix)) {
                let current = node;
                while (current.identifier !== prefix) {
                    current = current.parent;
                }
                return current;
            }
        }
        return null;
    }

    getFirstNode(node) {
        let currentNode = node;
        while (currentNode.parent) {
            currentNode = currentNode.parent;
        }
        return currentNode;
    }

    findPathInPolyring(startNode, endNode) {
        let path = [startNode.identifier];
        let siblingCount = 0;

        while (startNode.identifier !== endNode.identifier) {
            const lengthOfRouting = startNode.identifier.split('.').length;
            const lengthOfDestination = endNode.identifier.split('.').length;
            const matchingCoords = this.calculateMatchingCoordinates(startNode.identifier, endNode.identifier);

            if (matchingCoords <= lengthOfRouting - 2) {
                startNode = startNode.parent;
                path.push(startNode.identifier);
                siblingCount = 0;
            } else if (matchingCoords === lengthOfRouting - 1) {
                if (lengthOfDestination === lengthOfRouting - 1) {
                    startNode = startNode.parent;
                    path.push(startNode.identifier);
                    siblingCount = 0;
                } else if (lengthOfDestination >= lengthOfRouting) {
                    startNode = startNode.parent
                    if (startNode === null) {
                        startNode = this.getFirstNode(endNode);
                    } else {
                        startNode = startNode.children[siblingCount++];
                    }
                    if (!path.includes(startNode.identifier)) {
                        path.push(startNode.identifier);
                    }
                }
            } else if (matchingCoords === lengthOfRouting) {
                siblingCount = 0;
                if (lengthOfRouting < lengthOfDestination) {
                    startNode = startNode.children[siblingCount];
                }
                path.push(startNode.identifier)
            }
        }

        return path;
    }

    solve() {
        const startNode = this.findNodeByPrefix(this.graph, this.startGuid);
        const endNode = this.findNodeByPrefix(this.graph, this.endGuid);
        return this.findPathInPolyring(startNode, endNode);
    }
}
