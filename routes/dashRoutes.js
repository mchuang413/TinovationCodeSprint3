import express from 'express';
import chatController from '../controllers/chatController.js';
import goalsController from '../controllers/goalsController.js';

const router = express.Router();

// Route for handling POST requests to '/'
router.post('/chat', chatController.processMessage);

export default router;
