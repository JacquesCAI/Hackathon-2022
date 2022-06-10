import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import xss from 'xss-clean';
import {connect} from "./bin/bdd.js";
const scoreRoute = require('./routes/score.route');
const catalogRoute = require('./routes/catalog.route');

dotenv.config();
const app = express();
app.use(express.json({strict: false}));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cors());
app.use(express.static(__dirname+"/../public"))

connect();

scoreRoute(app);
catalogRoute(app);

export default app;
