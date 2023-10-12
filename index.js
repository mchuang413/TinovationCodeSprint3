import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Use the routes from chatRoutes.js
app.use('/', chatRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});