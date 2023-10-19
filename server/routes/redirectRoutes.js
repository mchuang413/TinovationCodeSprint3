import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redirectRoutes = express.Router();

const publicPath = path.join(__dirname, '..', '..', 'public');

const loginCheck = function(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

redirectRoutes.get('/overview.html', loginCheck, (req, res) => {
    res.sendFile(path.join(publicPath, 'overview.html'));
});

redirectRoutes.get('/dashboard.html', loginCheck, (req, res) => {
    res.sendFile(path.join(publicPath, 'dashboard.html'));
});

redirectRoutes.get('/login.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

redirectRoutes.get('/register.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});

redirectRoutes.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});


export default redirectRoutes;