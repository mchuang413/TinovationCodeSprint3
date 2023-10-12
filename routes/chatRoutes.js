import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// Route for handling POST requests to '/'
router.post('/', chatController.processMessage);

export default router;
