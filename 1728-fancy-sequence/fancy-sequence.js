var Fancy = function() {
    this.MOD = 1000000007n;
    this.seq = [];
    this.mul = 1n;
    this.add = 0n;
};

Fancy.prototype.modPow = function(a, b) {
    let res = 1n;
    a %= this.MOD;
    while (b > 0n) {
        if (b & 1n) res = (res * a) % this.MOD;
        a = (a * a) % this.MOD;
        b >>= 1n;
    }
    return res;
};

Fancy.prototype.modInv = function(x) {
    return this.modPow(x, this.MOD - 2n);
};

Fancy.prototype.append = function(val) {
    let v = BigInt(val);
    let normalized = (v - this.add + this.MOD) % this.MOD;
    normalized = (normalized * this.modInv(this.mul)) % this.MOD;
    this.seq.push(normalized);
};

Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % this.MOD;
};

Fancy.prototype.multAll = function(m) {
    let mm = BigInt(m);
    this.mul = (this.mul * mm) % this.MOD;
    this.add = (this.add * mm) % this.MOD;
};

Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) return -1;
    let val = this.seq[idx];
    return Number((val * this.mul + this.add) % this.MOD);
};