import express from "express";
import AdminController from "../controllers/admin.controller.js";
import { createUserSchema, updateUserSchema } from '../schemas/client.schema.js';
import { validate } from "../src/middlewares/zod.middleware.js";


const router = express.Router();
const adminController = new AdminController();

router.get('/getAllClient', adminController.getAllClient.bind(adminController));
router.get('/findClientById/:id', adminController.findClientById.bind(adminController));
router.post('/createClient', validate(createUserSchema), adminController.createClient.bind(adminController));
router.put('/updateClient/:id', validate(updateUserSchema),adminController.updateClient.bind(adminController));
router.post('/createReservation', adminController.createReservation.bind(adminController));
router.post('/cancelReservation', adminController.cancelReservation.bind(adminController));


export default router;