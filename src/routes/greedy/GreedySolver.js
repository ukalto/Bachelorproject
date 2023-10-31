export class GreedySolver {
    constructor(sheetData) {
        this.sheetData = sheetData;
    }

    solveSheetData() {
        const options = this.sheetData;

        const first_server = Object.entries(options)
            .reduce((min, option, index) => {
                const sum = option[1].reduce((acc, val) => acc + val, 0);
                return sum < min[1] ? [index + 1, sum] : min;
            }, [0, Number.MAX_SAFE_INTEGER]);

        const minimum = {};

        for (let i = 0; i < options.length; i++) {
            const curr = [];
            if (i !== first_server[0] - 1) {
                for (let j = 0; j < options[i].length; j++) {
                    curr.push(options[i][j] < options[first_server[0] - 1][j] ? options[i][j] : options[first_server[0] - 1][j]);
                }
                minimum[i + 1] = curr;
            }
        }

        const second_server = Object.entries(minimum)
            .reduce((min, [key, value]) => {
                const sum = value.reduce((acc, val) => acc + val, 0);
                return sum < min[1] ? [key, sum] : min;
            }, [0, Number.MAX_SAFE_INTEGER]);

        return {
            First_Server: `Latency ${first_server[0]}`,
            Second_Server: `Latency ${second_server[0]}`,
            Total_Latency: second_server[1],
        };
    }
}
