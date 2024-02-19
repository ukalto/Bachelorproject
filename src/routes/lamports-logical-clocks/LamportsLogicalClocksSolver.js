export class LamportsLogicalClocksSolver {
    constructor(arrows, processors) {
        this.arrows = arrows;
        this.processors = processors;
        this.messages = this.createMessages();
    }

    createMessages() {
        const messages = [];
        for (const arrowArr of this.arrows) {
            messages.push([arrowArr[0][1], arrowArr[0][2], arrowArr[1][1], arrowArr[1][2]]);
        }
        return messages.sort((a, b) => a[3] - b[3]);
    }

    calculateVectorsForMessage(from, fromRow, to, toRow) {
        if (this.processors[from][fromRow] > this.processors[to][toRow]) {
            this.processors[to][toRow] = this.processors[from][fromRow] + 1;
            for (let i = toRow + 1; i < this.processors[0].length; i++) {
                this.processors[to][i] = this.processors[to][i - 1] + this.processors[to][1]
            }
        }
    }

    solve() {
        this.messages.forEach(message => {
            const [from, fromRow, to, toRow] = message;
            this.calculateVectorsForMessage(from, fromRow, to, toRow);
        });
        return this.processors;
    }
}
