const useJSONFile = require('./useJSONFile');

const tinyDB = (path) => {
    try {
        const {read, save} = useJSONFile(path);
        const loadDB = async () => {
            const O_saved = await read();
            return O_saved;
        }
        const loadAssets = async () => {
            const O_saved = await read();
            const A_assets = O_saved.assets;
            return A_assets;
        }
        const saveAssets = async (assets) => {
            const O_saved = await read();
            const O_newRecords = {
                ...O_saved,
                assets
            }
            return save(O_newRecords);
        }
        const loadMenued = async () => {
            const O_saved = await read();
            const A_menued = O_saved.menued;
            return A_menued;
        }
        const saveMenued = async (menued) => {
            const O_saved = await read();
            const O_newRecords = {
                ...O_saved,
                menued
            }
            return save(O_newRecords);
        }
        const appendMenued = async (asset) => {
            const A_menued = await loadMenued();
            const A_menuedWithDefault = Array.isArray(A_menued) ? A_menued: [];
            const A_newMenued = [...A_menuedWithDefault, {...asset}]
            await saveMenued(A_newMenued)
            return {success: true, menuedLength: A_newMenued.length}
        }
        const deleteAssetById = async (id) => {
            const A_menued = await loadMenued();
            const A_newMenued = A_menued.filter(menu => menu.id !== id);
            await saveMenued(A_newMenued)
            return {success: true, menuedLength: A_newMenued.length}
        }
        const loadOptions = async () => {
            const O_saved = await read();
            const O_options = O_saved.options;
            return O_options;
        }
        const saveOptions = async (options) => {
            const O_saved = await read();
            const O_newRecords = {
                ...O_saved,
                options
            }
            return save(O_newRecords);
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
            const A_assets = await loadAssets();
            return A_assets.find((asset) => asset.id === id)
        }
        const appendAsset = async (asset) => {
            const A_assets = await loadAssets();
            const A_assetsWithDefault = Array.isArray(A_assets) ? A_assets: [];
            const id = Date.now();
            const created = new Date();
            const updated = null;
            const A_newAssets = [...A_assetsWithDefault, {...asset, id, created, updated}]
            await saveAssets(A_newAssets)
            return {success: true, assetsLength: A_newAssets.length}
        }
        const deleteAssetById = async (id) => {
            const A_assets = await loadAssets();
            const A_newAssets = A_assets.filter(asset => asset.id !== id);
            await saveAssets(A_newAssets)
            return {success: true, assetsLength: A_newAssets.length}
        }
        const updateAssetById = async (id, asset) => {
            const A_assets = await loadAssets();
            const targetAsset = A_assets.find(asset => asset.id === id);
            const targetAssetIndex = A_assets.findIndex(asset => asset.id === id);
            const updated = new Date();
            const A_newAssets = [
                ...A_assets.slice(0,targetAssetIndex), 
                {...targetAsset, ...asset, updated}, 
                ...A_assets.slice(targetAssetIndex+1,)]
            await saveAssets(A_newAssets)
            return {success: true, assetsLength: A_newAssets.length}
        }
        return {
            selectDB: loadDB,
            selectAssets: loadAssets,
            selectAssetById,
            deleteAssetById,
            updateAssetById,
            appendAsset,
            selectOptions: loadOptions,
            updateOption,
            selectMenued: loadMenued
            deleteMenuedById,
            appendMenued

        }
    } catch (err) {
        console.error('error in tinyDB:', err)
    }
}

module.exports = tinyDB;
