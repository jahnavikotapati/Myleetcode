class MovieRentingSystem {
    constructor(n, entries) {
        this.movieMap = new Map();
        this.priceMap = new Map();
        this.rented = new Set();
        for (let [shop, movie, price] of entries) {
            if (!this.movieMap.has(movie)) this.movieMap.set(movie, []);
            this.movieMap.get(movie).push([price, shop]);
            this.priceMap.set(`${shop},${movie}`, price);
        }
        for (let arr of this.movieMap.values()) arr.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    }
    search(movie) {
        if (!this.movieMap.has(movie)) return [];
        let res = [];
        for (let [price, shop] of this.movieMap.get(movie)) {
            if (!this.rented.has(`${shop},${movie}`)) res.push(shop);
            if (res.length === 5) break;
        }
        return res;
    }
    rent(shop, movie) {
        this.rented.add(`${shop},${movie}`);
    }
    drop(shop, movie) {
        this.rented.delete(`${shop},${movie}`);
    }
    report() {
        let arr = [];
        for (let key of this.rented) {
            let [shop, movie] = key.split(',').map(Number);
            arr.push([this.priceMap.get(key), shop, movie]);
        }
        arr.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
        return arr.slice(0, 5).map(([_, shop, movie]) => [shop, movie]);
    }
}
