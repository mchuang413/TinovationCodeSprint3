import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import redirectRoutes from './routes/redirectRoutes.js';
import dashRoutes from './routes/dashRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(session({
    secret: 'alternate form of the derivative',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', redirectRoutes);
app.use(express.static(path.join(__dirname, '..', 'web')));

app.use('/dashboard', dashRoutes);
app.use('/auth', authRoutes);


function logger(req, res, next) {
    console.log(`${req.method} request received at ${req.originalUrl}`);
    next();
}

app.listen(port, () => {
    console.log(`listening at http://127.0.0.1:${port}`);
});