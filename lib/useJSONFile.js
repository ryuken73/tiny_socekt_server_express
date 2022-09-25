const fsPromise = require('fs').promises;

const jsonDB = (path) => {
    const dbPath = path;
    const read = () => {
        console.log('read')
        const readPromise = fsPromise.readFile(dbPath)
        .then(data => {
            return JSON.parse(data);
        })
        .catch((err) => {
            throw err;
        })
        return readPromise;
    }
    const save = (jsonData) => {
        console.log('write')
		const writePromise = fsPromise.writeFile(dbPath, JSON.stringify(jsonData))
        .then(result => {
            return {succes: true};
        })
        .catch((err) => {
            throw err;
        })
        return writePromise;
    }
    const init = (dbPath) => {
        // return all supported method
        return {
            read,
            save,
        }
    }
    return {init};
}

const useJSONFile = (path) => {
    console.log('init db:', path)
    return jsonDB(path).init()
}


module.exports = useJSONFile;


// const main = async (path) => {
//     try {
//         const {read, save} = connect(path);
//         const ret = await save({a:1});
//         const saved = await read();
//         console.log(saved)
//     } catch(err){
//         console.log('error in main', err)
//     }
// }

// main('x:/b.json')