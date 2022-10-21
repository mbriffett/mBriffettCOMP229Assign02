// Third party modules 
import express from "express";
//middleware to extend express
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";

// ES Modules fix for __dirname 
import path, {dirname} from 'path'; 
import { fileURLToPath } from 'url'; 
const __dirname = dirname(fileURLToPath(import.meta.url)); //storing current directory path (for creating paths from this file more easily)

//Import router
import indexRouter from "./routes/index.route.server.js";

//Configuration module
import { secret } from "../config/config.js";

// instantiate app-server
const app = express();

//setup ViewEngine EJS - previously installed (all modules in node_modules)
app.set('views', path.join(__dirname, '/views')); //tells application path for views.  views in [current directory]/views.  path.join creates a path from the 2 params passed
app.set('view engine', 'ejs'); //tells express which view engine to use


app.use(logger('dev')); //logger (morgan) used in dev environment
app.use(express.json());
app.use(express.urlencoded({extended: false})); //ensures no environment specific encoding causes errors with express
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); //serves static files to this path (files on host machine to be used/executed there such as css and images)
app.use(session({
    secret: secret, //for encrypting session values 
    saveUninitialized: "false", //these lines mean session is lost on reload
    resave: "false"
}))


// add middleware to express application
app.use('/', indexRouter);

export default app; //exporting express application

// run app
//app.listen(3000);

//console.log('Server running at http://localhost:3000');
