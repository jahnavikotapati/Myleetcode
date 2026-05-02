var rotatedDigits = function(n) {
    let res = 0;

    for (let i = 1; i <= n; i++) {
        let x = i;
        let valid = true;
        let diff = false;

        while (x > 0) {
            let d = x % 10;

            if (d === 3 || d === 4 || d === 7) {
                valid = false;
                break;
            }

            if (d === 2 || d === 5 || d === 6 || d === 9) {
                diff = true;
            }

            x = Math.floor(x / 10);
        }

        if (valid && diff) res++;
    }

    return res;
};