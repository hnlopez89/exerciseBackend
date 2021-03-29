require("dotenv").config();
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res, next) {
	try {
		//DESESTRUCTURAMOS EL REQ.BODY
		const { email, password } = req.body;

		//ENCRIPTAMOS PASSWORD

		//OBTENEMOS DATOS DEL .JSON
		const users = require("../jugadores.json");

		//ENCONTRAMOS USUARIO Y PASSWORD
		const user = users.find((u) => u.email === email);

		//SI NO EXISTE USUARIO EN LA BD, ERROR
		if (!user) {
			throw new Error("Usuario no existe", 400);
		}

		//COMPARAMOS PASSWORDS
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("contraseña no coincide", 402);
		}

		//GENERAMOS TOKEN
		const token = jwt.sign(user.email, SECRET);

		res.send(`Estás logueado, ${user.name} y tu token es ${token}`);
	} catch (error) {
		next(error);
	}
}

module.exports = { login };
