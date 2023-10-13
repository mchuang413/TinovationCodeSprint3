import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import chatRoutes from './routes/dashRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(logger);
app.use('/dashboard', chatRoutes);
app.use('/auth', authRoutes);


function logger(req, res, next) {
    console.log(`${req.method} request received at ${req.originalUrl}`);
    next();
}

app.listen(port, () => {
    console.log(`listening at http://127.0.0.1:${port}`);
});