const e = require('express');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()
const app = express();

app.listen(3000, () => console.log('server started @ 3000'));

// function mid(req,res,next){
// 	console.log(req.params);
// 	console.log(req.query);
// }

app.get('/:id',  async (req, res) => {
	try {
		//requested site id
		const siteID = parseInt(req.params.id);
		//request type
		const requetType = req.query.requetType;
		//console.log(requetType);
		
		//if blocks
		if (isNaN(siteID)) throw new Error('Site ID must be a number');
		//if (siteID > 10) throw new Error('invalid site ID');
		
		//funcitons
		if(requetType === 'siteStatus'){
			//single site status
			res.json(await getSiteStatus(siteID));
		}
		else if(requetType === 'siteInfo'){
			//single site/server info
			res.json(await getSiteInfo(siteID));
		}
		else if(requetType === 'siteHealth'){
			//single site/server info
			res.json(await getSiteHealth(siteID));
		}

		else if(requetType === 'securityStatus'){
			//single security status
			res.json(await getSecurityStatus(siteID));
		}

		//res.json(await getSiteDetails(siteID));
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

//MainWP Domain and
const domain = process.env.DOMAIN;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

//single site status
function getSiteStatus(id) {
	return fetch(
		`https://${domain}/wp-json/mainwp/v1/site/site?site_id=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
	).then((r) => r.json());
}

//single site/server info
function getSiteInfo(id) {
	return fetch(
		`https://${domain}/wp-json/mainwp/v1/site/site-info?site_id=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
	).then((r) => r.json());
}

//single site healt
function getSiteHealth(id) {
	return fetch(
		`https://${domain}/wp-json/mainwp/v1/site/site-health-score?site_id=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
	).then((r) => r.json());
}

//single site healt
function getSecurityStatus(id) {
	return fetch(
		`https://${domain}/wp-json/mainwp/v1/site//site-security-issues?site_id=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
	).then((r) => r.json());
}