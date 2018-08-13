import express from 'express';
const router = express.Router();
// TODO Add Controllers

import testController from '../controllers/testController';
import validator from '../functions/functions';
import  authenticator from  '../services/authenticator';
import validatorObj from '../utils/validator';

router.get('/:id', testController.getTest);

router.post('/', testController.createTest);

router.put('/:id', testController.editTest);

export default router;
