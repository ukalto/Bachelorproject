export class DiffieHellmanSolver {
    constructor(modulo, base_value, person_a, person_b) {
        this.modulo = modulo;
        this.base_value = base_value;
        this.person_a = person_a;
        this.person_b = person_b;
    }

    solve() {
        return Math.pow(this.base_value, this.person_a * this.person_b) % this.modulo;
    }
}
