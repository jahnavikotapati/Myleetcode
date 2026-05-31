var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a, b) => a - b);

    let curr = BigInt(mass);

    for (const a of asteroids) {
        if (curr < BigInt(a)) return false;
        curr += BigInt(a);
    }

    return true;
};