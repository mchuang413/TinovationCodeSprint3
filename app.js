import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import dashRoutes from './routes/dashRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'web')));
app.use(logger);

app.use(session({
    secret: 'lesgodiamondforgenumber1', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

app.use('/dashboard', dashRoutes);
app.use('/auth', authRoutes);

function logger(req, res, next) {
    console.log(`${req.method} request received at ${req.originalUrl}`);
    next();
}

app.listen(port, () => {
    console.log(`listening at http://127.0.0.1:${port}`);
});