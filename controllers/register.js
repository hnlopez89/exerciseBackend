const fs = require("fs").promises;
const bcrypt = require("bcrypt");

async function register(req, res, next) {
	try {
		//DESESTRUCTURAMOS REQ.BODY
		const { name, email, password } = req.body;

		//OBTENEMOS USUARIOS DE .JSON
		const users = require("../jugadores.json");

		//
		//REVISAMOS QUE NO EXISTA NINGÚN USUARIO EXISTENTE
		if (users.find((user) => user.email === email)) {
			throw new Error("el usuario ya existe");
		}

		//CODIFICAMOS CONTRASEÑA CON LIBRERÍA
		const passwordCrypted = await bcrypt.hash(password, 10);

		//GUARDAMOS USUARIO EN VARIABLES USERS
		users.push({ name, email, password: passwordCrypted });

		//INTRODUCIMOS EL USUARIO EN EL .JSON
		await fs.writeFile("./jugadores.json", JSON.stringify(users));

		//MANDAMOS RESPUESTA
		res.send(users);
	} catch (error) {
		next(error);
	}
}

module.exports = { register };
