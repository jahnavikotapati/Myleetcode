var survivedRobotsHealths = function(positions, healths, directions) {
    let n = positions.length;
    let robots = [];

    for (let i = 0; i < n; i++) {
        robots.push([positions[i], healths[i], directions[i], i]);
    }

    robots.sort((a, b) => a[0] - b[0]);

    let stack = [];

    for (let i = 0; i < n; i++) {
        let [pos, health, dir, idx] = robots[i];

        if (dir === 'R') {
            stack.push([pos, health, dir, idx]);
        } else {
            while (stack.length && stack[stack.length - 1][2] === 'R' && health > 0) {
                let top = stack[stack.length - 1];

                if (top[1] < health) {
                    stack.pop();
                    health -= 1;
                } else if (top[1] === health) {
                    stack.pop();
                    health = 0;
                    break;
                } else {
                    top[1] -= 1;
                    health = 0;
                    break;
                }
            }

            if (health > 0) {
                stack.push([pos, health, dir, idx]);
            }
        }
    }

    stack.sort((a, b) => a[3] - b[3]);

    return stack.map(r => r[1]);
};