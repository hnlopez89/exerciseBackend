let { baseUrl } = require("./api");
const axios = require("axios");

async function searchCategory(req, res, next) {
	try {
		//DESESTRUCTURAMOS CATEGORIA
		const { category } = req.params;

		//CONSTRUIMOS URL
		baseUrl = baseUrl + category;

		//HACEMOS BUSQUEDA POR CATEGORÍA
		let data = (await axios(baseUrl)).data;

		const query = req.query;

		console.log(Object.keys(query));
		if (Object.keys(query)) {
			console.log("hola");
			for (const key in query) {
				console.log(query[key]);
				data = data.filter((entry) => entry[key] === query[key]);
			}
		}

		console.log(baseUrl);

		res.send(data);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { searchCategory };
