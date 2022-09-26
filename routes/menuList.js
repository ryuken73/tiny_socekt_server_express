const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
	const menuList = await global.db.selectMenuList();
	console.log(menuList);
	res.json({success:true, menuList: menuList||[]});
})

module.exports = router;