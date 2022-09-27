const useJSONFile = require('./useJSONFile');
const debounce = require('debounce-promise');

const tinyDB = (path) => {
    try {
        const {read, save} = useJSONFile(path);
        const saveDebounced = debounce(save, 200);
        let db = {assets:[], menu:[], options:[]};
        const reReadDB = async () => {
            const jsonDB = await read();
            db = {
                ...db,
                ...jsonDB
            }
            return db;
        }
        const getAssets = () => {
            return db.assets;
        }
        const loadAssets = async () => {
            return getAssets();
        }
        const saveAssets = async (assets) => {
            db.assets = assets;
            return saveDebounced(db);
        }
        const getMenu = () => {
            return db.menu;
        }
        const saveMenu = async (menu) => {
            db.menu = menu;
            return saveDebounced(db)
        }
        const appendMenu = async (asset) => {
            db.menu.push(asset);
            await saveDebounced(db);
            return {success: true, menuLength: db.menu.length}
        }
        const deleteMenuById = async (id) => {
            const targetIndex = db.menu.findIndex(asset => asset.id === id );
            if(targetIndex === -1){
                return {success: false}
            }
            db.menu.splice(targetIndex, 1);
            await saveDebounced(db)
            return {success: true, menueLength: db.menu.length}
        }
        const getOptions = async () => {
            return db.options;
        }
        const saveOptions = async (options) => {
            db.options = options;
            return saveDebounced(db);
        }
        const updateOption = async (key, value) => {
            const O_options = await loadOptions();
            const O_newOptions = {
                ...O_options,
                [key]: value
            }
            saveOptions(O_newOptions);
            return {success: true, affectedOption: key};
        }
        const selectAssetById = async (id) => {
            return db.assets.find((asset) => asset.id === id)
        }
        const appendAsset = async (asset) => {
            const id = Date.now();
            const created = (new Date()).toLocaleString();
            const updated = null;
            db.assets.push({...asset, id, created, updated});
            await saveDebounced(db)
            return {success: true, assetsLength: db.assets.length}
        }
        const deleteAssetById = async (id) => {
            const targetIndex = db.assets.findIndex(asset => asset.id === id );
            if(targetIndex === -1){
                return {success: false}
            }
            db.assets.splice(targetIndex, 1);
            await saveDebounced(db)
            return {success: true, menueLength: db.assets.length}
        }
        const updateAssetById = async (id, asset) => {
            const targetAsset = db.assets.find(asset => asset.id === id);
            const targetAssetIndex = db.assets.findIndex(asset => asset.id === id);
            const updated = new Date();
            db.assets[targetAssetIndex] = {...targetAsset, ...asset, updated}
            await saveDebounced(db)
            return {success: true, assetsLength: db.assets.length}
        }
        return {
            selectDB: reReadDB,
            selectAssets: loadAssets,
            selectAssetById,
            deleteAssetById,
            updateAssetById,
            appendAsset,
            selectOptions: getOptions,
            updateOption,
            selectMenuList: getMenu,
            deleteMenuById,
            appendMenu

        }
    } catch (err) {
        console.error('error in tinyDB:', err)
    }
}

module.exports = tinyDB;
