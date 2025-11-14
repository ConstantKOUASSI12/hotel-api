import express from "express";
import ClientController from "../controllers/client.controller.js";


const router = express.Router();
const clientController = new ClientController();

router.get('/getHotelInformations', clientController.getHotelInformations.bind(clientController));
router.get('/getAllRooms', clientController.getAllRooms.bind(clientController)); 
router.get('/findRoomById/:id', clientController.findRoomById.bind(clientController)); 
router.post('/createReservation', clientController.createReservation.bind(clientController));
router.post('/cancelReservation', clientController.cancelReservation.bind(clientController));


export default router;