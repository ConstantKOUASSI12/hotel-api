import ClientService from "../services/client.service.js"
import ApiResponse from "../src/utils/ApiResponse.js"
import { ClientError } from "../src/utils/errors/client.error.js";
import AppError from "../src/utils/AppError.js";
import { ClientSuccess } from "../src/utils/responses/client.success.js";

export default class ClientController {

  constructor() {
    this.clientService = new ClientService(); 
  }

  async getHotelInformations (req, res, next) {

    try {
        const hotel = await this.clientService.getHotelInformations();
    
        return new ApiResponse(ClientSuccess.HOTEL_INFORMATION,hotel).send(res);

    } catch (error) {
        next(error);
    }
  }

  async getAllRooms(req,res,next){
    try {
        const rooms = await this.clientService.getAllRooms();
    
        return new ApiResponse(ClientSuccess.HOTEL_INFORMATION,rooms).send(res);

    } catch (error) {
        next(error);
    }
  }

  async findRoomById(req,res,next){
    try {
        const id = parseInt(req.params.id);
        
        const room = await this.clientService.findRoomById(id);
        
        return new ApiResponse(ClientSuccess.ROOM_FOUNDED, room).send(res);

    } catch (error) {
        next(error)
    }
  }

  async createReservation(req, res, next){
    
      try {
        
        const params = req.body

        if (Object.keys(params).length >=3) return next(new AppError(ClientError.INPUT_ERROR,params));
  
        if (!params['clientId'] || !params['roomId'] || isNaN(Number(params['clientId'])) || isNaN(Number(params['roomId']))) {
          return next(new AppError(ClientError.INPUT_ERROR,params));
        }
        
        const reservation = await this.clientService.createReservation(params);
  
        return new ApiResponse(ClientSuccess.RESERVATION_CREATED, reservation).send(res);
        
      } catch (error) {
        next(error);
      }
  }

  async cancelReservation(req, res, next){
      
      try {
        
        const params = req.body

        if (Object.keys(params).length >=3) return next(new AppError(ClientError.INPUT_ERROR,params));
  
        if (!params['clientId'] || !params['roomId'] || isNaN(Number(params['clientId'])) || isNaN(Number(params['roomId']))) {
          return next(new AppError(ClientError.INPUT_ERROR,params));
        }
        
        const cancelReservation = await this.clientService.cancelReservation(params);
  
        return new ApiResponse(ClientSuccess.CANCEL_RESERVATION, cancelReservation).send(res);
        
      } catch (error) {
        next(error);
      }
  }

}