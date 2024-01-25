import express from 'express';
const cookieParser = require('cookie-parser');

import { router } from './routes';
var cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export { app };
