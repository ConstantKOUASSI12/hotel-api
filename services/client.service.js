import ClientModel from "../models/client.model.js"
import { ClientError } from "../src/utils/errors/client.error.js";
import AppError from "../src/utils/AppError.js";
import { ClientSuccess } from "../src/utils/responses/client.success.js";
import ApiResponse from "../src/utils/ApiResponse.js";

export default class ClientService {

  constructor() {
    this.clientModel = new ClientModel();
  }

  async getHotelInformations(){
    const hotelFullData = await this.clientModel.getHotelInformations()
    const { name, location, contact, facilities, rooms } = hotelFullData;

    return {
        name,
        location,
        contact,
        facilities,
        "Bedrooms":rooms.length
      }
  }

  async getAllRooms(){
    const hotelFullData = await this.clientModel.getHotelInformations()
    const availableRooms = hotelFullData['rooms'].filter(room => !room.reserved);

    if (availableRooms.length == 0 ) throw new ApiResponse(ClientSuccess.ROOM_NOT_AVAILABLE);

    return availableRooms;
  }

  async findRoomById(id){
    
    const room = await this.clientModel.findRoomById(id)

    if (!room || room?.reserved) throw new AppError(ClientError.ROOM_NOT_FOUND);

    return room;
  }

  async findClientById(id){

    const client = await this.clientModel.findClientById(id)
    if (!client) throw new AppError(ClientError.CLIENT_NOT_FOUND);
    return client;

  }

  async createReservation(params){

      const clientId = parseInt(params['clientId'])
      const roomId = parseInt(params['roomId'])
  
      const room = await this.findRoomById(roomId)
      const client = await this.findClientById(clientId)
  
      const reservation = await this.clientModel.createReservation(client.id,room.id);
  
      return reservation
  }

  async cancelReservation(params){

      const clientId = parseInt(params['clientId'])
      const roomId = parseInt(params['roomId'])
  
      const room = await this.clientModel.findRoomById(roomId)
      const client = await this.findClientById(clientId)


      if (!room || !room.reserved) throw new AppError(ClientError.ROOM_NOT_RESERVED,params);

      if (client.id !== room.clientId) throw new AppError(ClientError.CLIENT_NOT_AUTHORIZED,params);

      const reservation = await this.clientModel.cancelReservation(room.id);
  
      return reservation
  }


}