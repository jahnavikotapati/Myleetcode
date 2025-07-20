class Node {
    constructor(name) {
        this.name = name;
        this.children = new Map();
        this.del = false;
    }
}

var deleteDuplicateFolder = function(paths) {
    const root = new Node("");

    // Build Trie
    for (const path of paths) {
        let node = root;
        for (const part of path) {
            if (!node.children.has(part)) {
                node.children.set(part, new Node(part));
            }
            node = node.children.get(part);
        }
    }

    const seen = new Map();

    // Serialize subtrees
    function serialize(node) {
        if (node.children.size === 0) return "";

        let childrenSerials = [];

        for (const [name, child] of [...node.children.entries()].sort()) {
            const childSerial = serialize(child);
            childrenSerials.push(name + "(" + childSerial + ")");
        }

        const serial = childrenSerials.join("");

        if (seen.has(serial)) {
            for (const dupNode of seen.get(serial)) {
                dupNode.del = true;
            }
            node.del = true;
            seen.get(serial).push(node);
        } else {
            seen.set(serial, [node]);
        }

        return serial;
    }

    serialize(root);

    const result = [];

    // DFS: collect only undeleted paths
    function dfs(node, path) {
        for (const [name, child] of node.children) {
            if (child.del) continue;
            path.push(name);
            result.push([...path]);
            dfs(child, path);
            path.pop();
        }
    }

    dfs(root, []);
    return result;
};
