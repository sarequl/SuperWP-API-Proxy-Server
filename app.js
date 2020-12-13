const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.listen(3000, () => console.log('server started @ 3000'));

app.get('/:id', async (req, res) => {
	try {
		const siteID = parseInt(req.params.id);
		if (isNaN(siteID)) throw new Error('Site ID must be a number');
		if (siteID > 10) throw new Error('invalid site ID');

		res.json(await getSiteDetails(siteID));
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

//MainWP Domain and
const domain = 'superwp.sarequl.me';
const consumerKey = 'ck_7d03718a5389b029c656e0b6a2b5b8f798eeedbf';
const consumerSecret = 'cs_8568212749fafb50ce05bbf06ac80190fe6033fd';

function getSiteDetails(id) {
	return fetch(
		`https://${domain}/wp-json/mainwp/v1/site/site?site_id=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
	).then((r) => r.json());
}
