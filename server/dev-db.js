// Dev-purpose db
/**
 * @type {{ id: string, alias: string, filename: string, size: number, createdAt: string, active: boolean }[]}
 */
const files = [];

console.log("[DB] Created DB");

function map(file) {
    const { id, alias, filename, size, createdAt } = file;
    return { id, alias, filename, size, createdAt };
}

const queryAll = () => {
    console.log("[DB] Querying all active files");
    return files.reduce((activeFiles, file) => {
        if (file.active)
            activeFiles.push(map(file));

        return activeFiles;
    }, []);
};

const queryById = (id) => {
    const file = files.find(f => f.id === id);
    return typeof file === "undefined" ? undefined : map(file);
}

const insert = (id, alias, filename, size) => {
    console.log("[DB] Inserting new file: " + `${alias} -> ${filename}`);
    const fileObject = {
        id,
        alias,
        filename,
        size,
        createdAt: new Date().toISOString(),
        active: true
    };

    files.push(fileObject);
};

const remove = (id) => {
    console.log("[DB] Removing file " + id);
    const file = files.find(f => f.id === id);
    if (typeof file === "undefined") return false;
    file.active = false;
    return true;
};

module.exports = { queryAll, queryById, insert, remove };
