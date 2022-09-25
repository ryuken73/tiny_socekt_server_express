const fsPromise = require('fs').promises;
const path = require('path');
const express = require('express');
const fs = require('fs');
const mkdirp = require('mkdirp');
const router = express.Router();
const utils = require('../utils');

const saveMedia = (inStream, outStream) => {
	return new Promise((resolve, reject) => {
		inStream.pipe(outStream)
		inStream.on('end', () => {
			resolve()
		})
		inStream.on('error', (err) => {
			console.log(err)
			reject(err);
		})
	})
}

router.put('/', async (req, res, next) => {
	const { fname } = req.query;
	const baseDir = req.app.get('MEDIA_ROOT');
	const targetDir = path.join(baseDir, utils.date.getString({dateOnly: true}));
	mkdirp(targetDir)
	.then(async made => {
		const outFname = path.join(targetDir, fname);
		const inStream = req;
		const outStream = fs.createWriteStream(outFname)
		saveMedia(inStream, outStream)
		res.json({success:true, saved:outFname});
	})
	.catch(err => {
		console.error(err);
		res.json({success: false});
	})
})

module.exports = router;