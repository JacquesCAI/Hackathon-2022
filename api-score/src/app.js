import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import xss from 'xss-clean';
import {connect} from "./bin/bdd.js";

dotenv.config();
const app = express();
app.use(express.json({strict: false}));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cors());

connect()

const scoreRoute = require('./routes/score.route');
scoreRoute(app);

export default app;
