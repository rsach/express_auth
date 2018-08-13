import express from 'express';
const router = express.Router();
// TODO Add Controllers

import adminController from '../controllers/adminController';
import authenticator from '../services/authenticator';



/* GET index page. */
router.post('/register', adminController.register);
router.post('/login', adminController.login);



router.get('/users', authenticator.authenticateAdmin, adminController.getUsers);




export default router;