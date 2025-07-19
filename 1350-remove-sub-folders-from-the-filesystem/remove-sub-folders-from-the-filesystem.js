var removeSubfolders = function(folder) {
    folder.sort();
    const result = [];

    for (let i = 0; i < folder.length; i++) {
        if (
            result.length === 0 ||
            !folder[i].startsWith(result[result.length - 1] + "/")
        ) {
            result.push(folder[i]);
        }
    }

    return result;
};
