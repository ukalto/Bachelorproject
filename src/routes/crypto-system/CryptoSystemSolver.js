export class CryptoSystemSolver {
    constructor(ka_pu, ka_pr, na, kb_pu, kb_pr, nb, message, h) {
        this.ka_pu = ka_pu;
        this.ka_pr = ka_pr;
        this.na = na;
        this.kb_pu = kb_pu;
        this.kb_pr = kb_pr;
        this.nb = nb;
        this.message = message;
        this.h = h;
    }

    E(K, m, n) {
        return Math.pow(m, K) % n;
    }

    H(m) {
        return m % this.h;
    }

    solve() {
        const confidentiality = this.E(this.kb_pu, this.message, this.nb);
        const authenticityIntegrity = this.E(this.ka_pr, this.H(this.message), this.na);

        return {
            confidentiality,
            authenticityIntegrity
        };
    }
}
