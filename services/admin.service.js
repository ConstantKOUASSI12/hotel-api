import fs from 'fs';
import AdminModel from "../models/admin.model.js";
import saveFile from '../src/utils/save_file.util.js'
import {AdminError} from '../src/utils/errors/index.js';
import AppError from "../src/utils/AppError.js";
import { AdminSuccess } from '../src/utils/responses/admin.success.js';

export default class AdminService {

  constructor() {
    this.adminModel = new AdminModel();
  }


  async getAllClient() {
    return await this.adminModel.getAllClient()
  }

  async loadRooms(){
    const hotelData = await this.adminModel.loadRooms()

    const rooms =  hotelData['rooms']

    return rooms
  }


  async findClientById(id){
    
    const client = await this.adminModel.findClientById(id)

    if (!client) throw new AppError(AdminError.CLIENT_NOT_FOUND,{clientId: id})

    return client;
  }
  

  async createClient(clientData){

    const clients = await this.adminModel.getAllClient()

    const existing = clients.find(
      (c) => c.email.toLowerCase() === clientData.email.toLowerCase() || c.phone === clientData.phone
    )

    if (existing) throw new AppError(AdminError.CLIENT_ALREADY_EXISTS, [existing['email'] , existing['phone']])

    const newClient = await this.adminModel.createClient(clientData)

    return newClient
  }


  async updateClient(clientId, updateData){

    const clients = await this.adminModel.getAllClient()

    const checkClient = await this.findClientById(clientId)

    if (
        updateData?.name?.toLowerCase() === checkClient?.name?.toLowerCase() &&
        updateData?.email?.toLowerCase() === checkClient?.email?.toLowerCase() &&
        updateData?.phone?.toLowerCase() === checkClient?.phone?.toLowerCase()
    ) throw new AppError(AdminError.CLIENT_ATTRIBUTES_ALREADY_SET, checkClient);
    

    /* if (checkClient['name'].toLowerCase() == updateData['name'].toLowerCase() && 
      checkClient['email'] == updateData['email'] && 
      checkClient['phone'] == updateData['phone']) throw new AppError(AdminError.CLIENT_ATTRIBUTES_ALREADY_SET, checkClient)  */ 

    const existing = clients.find(
      (c) => 
          (updateData?.email && c?.email?.toLowerCase() === updateData.email.toLowerCase()) || 
          (updateData?.phone && c?.phone === updateData.phone) 
    )

    if (existing && existing['id'] !== clientId) throw new AppError(AdminError.CLIENT_ALREADY_EXISTS, updateData)

    const updated = await this.adminModel.updateClient(clientId, updateData);

    // if (!updated) throw new AppError(AdminError.CLIENT_NOT_FOUND,clientId);

    return updated;

  }

  async createReservation(params){

    const clientId = parseInt(params['clientId'])
    const roomId = parseInt(params['roomId'])

    const rooms = await this.loadRooms()
    const client = await this.findClientById(clientId)

    const roomIndex = rooms.findIndex(r => r.id === roomId);

    if (roomIndex === -1) throw new AppError(AdminError.ROOM_NOT_FOUND,{roomId: roomId});

    if (rooms[roomIndex].reserved) throw new AppError(AdminError.RESERVATION_ALREADY_RESERVED,{roomId: roomId});

    const reservation = await this.adminModel.createReservation(client.id,roomId);

    return reservation

  }

  async cancelReservation(params){

    const clientId = parseInt(params['clientId'])
    const roomId = parseInt(params['roomId'])

    const rooms = await this.loadRooms()
    const client = await this.findClientById(clientId)

    const roomIndex = rooms.findIndex(r => r.id === roomId);

    if (roomIndex === -1) throw new AppError(AdminError.ROOM_NOT_FOUND,{roomId: roomId});

    if (!rooms[roomIndex].reserved) throw new AppError(AdminError.ROOM_NOT_RESERVED,params);

    if (client.id !== rooms[roomIndex].clientId) throw new AppError(AdminError.CLIENT_NOT_AUTHORIZED,params);

    const cancelReservation = await this.adminModel.cancelReservation(roomIndex)

    return cancelReservation;
    
  }

}