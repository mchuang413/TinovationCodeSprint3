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
router.get('/id', goalsController.getId);

router.post('/pay', payController.paySuccess);
router.get('/diamonds', payController.getDiamonds);
router.post('/updateDiamonds', payController.updateDiamonds);
export default router;