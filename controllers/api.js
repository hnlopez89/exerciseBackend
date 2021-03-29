const fetch = require("node-fetch");
const baseUrl = "https://anapioficeandfire.com/api/";
const axios = require("axios");

async function getData(url) {
	try {
		const data = (await axios(url)).data;

		return data;
	} catch (error) {
		console.log(error);
	}
}

async function baseData(req, res, next) {
	try {
		const data = await getData(baseUrl);

		res.send(data);
	} catch (error) {
		next(error);
	}
}

module.exports = { baseData, baseUrl };
