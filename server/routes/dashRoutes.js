import express from 'express';
import chatController from '../controllers/chatController.js';
import goalsController from '../controllers/goalsController.js';
import payController from '../controllers/payController.js';

const router = express.Router();

router.post('/chat', chatController.processMessage);
router.get('/user', goalsController.getUsername);
router.post('/goal', goalsController.addGoal);
router.get('/goals', goalsController.getGoals);
router.post('/step', goalsController.addStep);
//router.post('/post', payController.buyDiamonds);
router.post('/id', goalsController.getId);

export default router;  