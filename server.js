// Required Packages
import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import bodyParser from "body-parser";
import socketio from "socket.io";
import morgan from "morgan";
import favicon from "serve-favicon";
import consign from "consign";
import twilio from "twilio";
import config from "./config.js";


// App Constants
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const client = twilio(config.twilio.twilioaccountSID, config.twilio.twilioauthToken);

// Minimal Required Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
		Authorization');
	next();
});
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.png')))

// Set express-handlebars view Engine
app.engine('.hbs', exphbs({defaultLayout: 'main' , extname: '.hbs'}));
app.set('view engine', '.hbs');

// Use Router Object as Middleware to Control All Routes
app.use(router);

// Entry Point Of Our App's Routes
consign()
	.include('routes')
	.into(app,router,config,client);
	
const server = app.listen(port, ()=> {
	console.log(`We have started our server on port ${port}`);
});