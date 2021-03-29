require("dotenv").config;
const { SECRET, REDIRECT } = process.env;
const jwt = require("jsonwebtoken");

//MIDDLEWARE COMPROBANTE DE USUARIO AUTORIZADO
function userAuthorized(req, res, next) {
	try {
		//OBTENGO DATOS DEL HEADER
		const { authorization } = req.headers;

		if (!authorization) {
			res.redirect("http://localhost:3000/login");
		} else {
			//DESCODIFICAMOS EL TOKEN
			const decoded = jwt.verify(authorization, SECRET);

			//SWIPE LEFT
			next();
		}
	} catch (error) {
		res.redirect(REDIRECT);
		//next(error);
	}
}

module.exports = { userAuthorized };
