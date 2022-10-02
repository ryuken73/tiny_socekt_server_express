const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
	const assets = await global.db.selectAssets()
	console.log(assets)
	res.json({success:true, assetList: assets||[]});
})

router.put('/default', async (req, res, next) => {
	const assets = await global.db.selectAssets()
	console.log(assets)
	res.json({success:true, assetList: assets||[]});
})

module.exports = router;