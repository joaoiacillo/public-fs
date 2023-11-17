// Dev-purpose db
const files = [];

console.log("[DB] Created DB");

const queryAll = () => {
    console.log("[DB] Querying all active files");
    return files.reduce((activeFiles, file) => {
        const { id, alias, filename, size, createdAt } = file;
        if (file.active)
            activeFiles.push({ id, alias, filename, size, createdAt });

        return activeFiles;
    }, []);
};

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

module.exports = { queryAll, insert, remove };
