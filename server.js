require("dotenv").config();

//IMPORTAMOS CONTROLADORES
const { register } = require("./controllers/register");
const { login } = require("./controllers/login");
const { userAuthorized } = require("./middleware/auth");
const { baseData } = require("./controllers/api");
const { searchCategory } = require("./controllers/category");

//IMPORTAMOS PUERTO DÓNDE SE EJECUTA
const { PORT } = process.env;

//IMPORTAMOS LIBRERÍAS A UTILIZAR
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//UTILIZAMOS EXPRESS
const app = express();

//USAMOS MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());

/**********************************/

//CONECTAMOS RUTAS Y MÉTODOS CON FUNCIONES
//METODO GET SIMPLE DE TEST
app.get("/", userAuthorized, (req, res) => res.send("Rula!"));

//METODO POST PARA REGISTRAR USUARIO
app.post("/register", register);

//METODO POST PARA LOGUEAR USUARIO
app.post("/login", login);

//METIDO GET LOGIN PARA REDIRECCION
app.get("/login", (req, res) => res.send("login"));

//METODO GET CON RUTA PROTEGIDA
app.get("/got", userAuthorized, (req, res) => res.send("no te me has colao"));

//METODO GET PARA CONSULTAR API EXTERNA
app.get("/api", baseData);

//RUTA QUE ACEPTE CATEGORÍAS
app.get("/api/:category", searchCategory);

/**********************************/
//GESTIONAMOS ERROR
app.use((error, req, res, next) => {
	res.send(`Pollito, la has liao: ${error.message}`);
});

app.use((req, res) => res.status(404).send("Página no encontrada"));

app.listen(PORT, () => {
	console.log(`Nenos y chorbas, puerto rulando en http://localhost:${PORT}`);
});
