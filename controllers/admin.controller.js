import AdminService from '../services/admin.service.js';
import {AdminError} from '../src/utils/errors/index.js';
import AppError from "../src/utils/AppError.js";
import {AdminSuccess} from "../src/utils/responses/index.js";
import ApiResponse from "../src/utils/ApiResponse.js"

export default class AdminController {

  constructor() {
    this.adminService = new AdminService(); 
  }

  async getAllClient(req, res, next) {
    try {
      const client = await this.adminService.getAllClient();

      return new ApiResponse(AdminSuccess.CLIENT_FOUNDED,client).send(res);

    } catch (error) {
      next(error);
    }
  }

  async findClientById(req , res, next) {
    try {
      const id = parseInt(req.params.id);

      const client = await this.adminService.findClientById(id);

      return new ApiResponse(AdminSuccess.CLIENT_FOUNDED, client).send(res);
      
    } catch (error) {
      next(error)
    }
  }

  async createClient (req , res, next) {
    try {

      const newClient = await this.adminService.createClient(req.body);

      return new ApiResponse(AdminSuccess.CLIENT_CREATED, newClient).send(res);

    } catch (error) {
      next(error);
    }
    
  }

  async updateClient(req , res, next){

    try {

      const param = req.params

      if (!param['id'] || isNaN(Number(param['id']))) return next(new AppError(AdminError.INPUT_ERROR,param));

      const id = parseInt(param['id']);

      const updatedClient = await this.adminService.updateClient(id, req.body);

      return new ApiResponse(AdminSuccess.CLIENT_UPDATED, updatedClient).send(res);

    } catch (error) {
      next(error);
    } 
  }

  async createReservation(req, res, next){
    try {

      const params = req.body

      if (Object.keys(params).length >=3) return next(new AppError(AdminError.INPUT_ERROR,params));

      if (!params['clientId'] || !params['roomId'] || isNaN(Number(params['clientId'])) || isNaN(Number(params['roomId']))) {
        return next(new AppError(AdminError.INPUT_ERROR,params));
      }
      
      const reservation = await this.adminService.createReservation(params);

      return new ApiResponse(AdminSuccess.RESERVATION_CREATED, reservation).send(res);
      

    } catch (error) {
      next(error);
    }
  }

  async cancelReservation(req, res, next){
    try {
      const params = req.body

      if (Object.keys(params).length >=3) return next(new AppError(AdminError.INPUT_ERROR,params));

      if (!params['clientId'] || !params['roomId'] || isNaN(Number(params['clientId'])) || isNaN(Number(params['roomId']))) {
        return next(new AppError(AdminError.INPUT_ERROR,params));
      }

      const cancelReservation = await this.adminService.cancelReservation(params);
      
      return new ApiResponse(AdminSuccess.CANCEL_RESERVATION, cancelReservation).send(res);

    } catch (error) {
      next(error);
    }
  }

}