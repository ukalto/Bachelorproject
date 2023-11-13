export class BerkeleySolver {
    constructor(serverTimes, timeDaemonIndex) {
        this.servers = serverTimes.map((time, index) => [
            `Server ${String.fromCharCode(65 + index)}`,
            this.convertToSeconds(time),
        ]);
        this.timeDaemonIndex = timeDaemonIndex;
    }

    convertToSeconds(time) {
        let hours = time.slice(0, time.length / 2);
        let minutes = time.slice(time.length / 2 + 1);
        return (parseInt(hours) * 60 + parseInt(minutes)) * 60;
    }

    secondsToTime(seconds) {
        let sign = seconds < 0 ? "-" : "";
        seconds = Math.abs(seconds);
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    solve() {
        const numServers = this.servers.length;
        const result = [];

        // Round 1
        const roundOne = [];
        for (let i = 0; i < numServers; i++) {
            roundOne.push({
                from: this.servers[this.timeDaemonIndex][0],
                to: this.servers[i][0],
                time: this.secondsToTime(this.servers[i][1]),
                time_sent: this.secondsToTime(this.servers[this.timeDaemonIndex][1]),
                time_adjust: null,
            });
        }
        result.push(roundOne);

        // Round 2
        const roundTwo = [];
        const diff_times_two = [];
        for (let i = 0; i < numServers; i++) {
            diff_times_two.push(this.servers[i][1] - this.servers[this.timeDaemonIndex][1])
            roundTwo.push({
                from: this.servers[i][0],
                to: this.servers[this.timeDaemonIndex][0],
                time: this.secondsToTime(this.servers[this.timeDaemonIndex][1]),
                time_sent: null,
                time_adjust: this.secondsToTime(diff_times_two[i]),
            });
        }
        result.push(roundTwo);

        // Round 3
        const roundThree = [];
        const diff_times_three = [];
        const avg = diff_times_two.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0) / numServers;
        this.servers[this.timeDaemonIndex][1] += avg
        diff_times_three.push(avg);
        for (let i = 0; i < numServers; i++) {
            if (i !== this.timeDaemonIndex) {
                diff_times_three.push(this.servers[this.timeDaemonIndex][1] - this.servers[i][1])
            }
            roundThree.push({
                from: this.servers[this.timeDaemonIndex][0],
                to: this.servers[i][0],
                time: this.secondsToTime(this.servers[this.timeDaemonIndex][1]),
                time_sent: this.secondsToTime(this.servers[this.timeDaemonIndex][1]),
                time_adjust: this.secondsToTime(diff_times_three[i]),
            });
        }
        result.push(roundThree);

        return result;
    }
}
