//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

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

//Import mongoose module
import mongoose from 'mongoose';

//Import routes
import indexRouter from "./routes/index.route.server.js";
import contactRouter from './routes/contacts.route.server.js';
import authRouter from './routes/auth.route.server.js';

// Import Api Routes
import authApiRouter from './routes/api/auth-api.route.server.js';
import moviesApiRouter from './routes/api/contacts-api.route.server.js';

//Configuration module
import { MongoURI, secret } from "../config/config.js";

// instantiate app-server
const app = express();

//Complete the DB confoguration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Listen for connection success or error
db.on('open' , () => console.log('Connected to MongoDB!'));
db.on('error', () => console.log('Mongo Connection Error!'));

//setup ViewEngine EJS - previously installed (all modules in node_modules)
app.set('views', path.join(__dirname, '/views')); //tells application path for views.  views in [current directory]/views.  path.join creates a path from the 2 params passed
app.set('view engine', 'ejs'); //tells express which view engine to use

// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// modules for JWT Support 
import cors from 'cors'; 
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Auth Step 2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import User from './models/user.js';

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

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: secret,
    saveUninitialized: false, 
    resave: false
}));

// Auth Step5 - Setup Flash
app.use(flash());

// Auth Step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implement the Auth Strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup JWT Options
let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

// set JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(strategy);

// add middleware to express application
// use routes
app.use('/', indexRouter);
app.use('/', contactRouter);
app.use('/', authRouter);

// Use API Routes
app.use('/api/auth', authApiRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesApiRouter);

export default app; //exporting express application

// run app
//app.listen(3000);

console.log('Server running at http://localhost:3000');
