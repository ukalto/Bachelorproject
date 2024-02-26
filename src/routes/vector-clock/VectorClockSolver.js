export class VectorClockSolver {
    constructor(vectors, arrows, increments, timeSteps) {
        this.vectors = vectors;
        this.arrows = arrows;
        this.increments = increments;
        this.taskList = this.createTaskList(arrows, increments, timeSteps);
    }

    createTaskList(arrows, increments, vectorsLength) {
        const taskList = new Array(vectorsLength).fill(null).map(() => []);
        arrows.forEach(arrow => {
            if (!arrow.includes(null)) {
                const from = arrow[0][1];
                const to = arrow[1][1];
                const time = arrow[0][2];
                taskList[time].push([from, to]);
            }
        });

        increments.forEach((value, key) => {
            const [vectorIndex, timeIndex] = value;
            taskList[timeIndex].push(vectorIndex);
        });
        return taskList;
    }

    updateVectors(vectorFrom, vectorTo) {
        const updatedVector = vectorTo.slice();
        for (let idx = 0; idx < vectorFrom.length; idx++) {
            const vFrom = vectorFrom[idx];
            const vTo = vectorTo[idx];
            if (vFrom > vTo) {
                updatedVector[idx] = vFrom;
            }
        }
        return updatedVector;
    }

    solve() {
        for (let time = 0; time < this.taskList.length; time++) {
            const tasks = this.taskList[time];
            if (tasks.length === 0) continue;
            for (let task of tasks) {
                if (task.length === 2) {
                    const from = task[0];
                    const to = task[1];
                    this.vectors[from][time][from] += 1;
                    this.vectors[to][time] = this.updateVectors(this.vectors[from][time], this.vectors[to][time]);
                    this.vectors[to][time][to] += 1;
                } else {
                    const inc = task;
                    this.vectors[inc][time][inc] += 1;
                }
            }
            if (time !== this.taskList.length - 1) {
                this.vectors.forEach(vector => {
                    vector[time + 1] = vector[time];
                })
            }
        }
        return this.vectors;
    }
}
