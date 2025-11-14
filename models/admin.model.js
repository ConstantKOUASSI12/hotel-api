import { promises as fs } from "fs";
import path from "path";

export default class AdminModel { 

    constructor() {
        this.DATA_FILE = path.resolve("./data/clients.json");
        this.DATA_ROOM_FILE = path.resolve("./data/hotel.json");
    }
    
    async getAllClient() {
        try {
            const data = await fs.readFile(this.DATA_FILE, "utf8");
            const json = JSON.parse(data);
            const clients = json['clients'] || [];
            return clients
        } catch (err) {
            console.error("Error reading clients.json:", err.message);
            return clients = [];
        }
    };

    async loadRooms() {
        try {
            const room_data = await fs.readFile(this.DATA_ROOM_FILE,'utf8');
            const rooms = JSON.parse(room_data);
            return rooms
        } catch (error) {
            console.error("Error :", err.message);
        }
    }


    async findClientById (id){
        const users = await this.getAllClient()
        return users.find((c) => c.id === id);
    }


    async createClient(data){
        try {
            const allClient = await this.getAllClient()
            const newClient = {
                id : allClient.length + 1,
                ...data,
                createdAt: new Date().toISOString()
            }
            
            allClient.push(newClient)
            await fs.writeFile(this.DATA_FILE, JSON.stringify({"clients": allClient }, null, 2), "utf-8");

            return newClient

        } catch (error) {
            console.error("Error ", error.message);
        }
        
    }

    async updateClient(clientId,updateData) {

        try {
            const allClients  = await this.getAllClient()
            const clientIndex = allClients.findIndex(u => u.id === clientId);

            allClients[clientIndex] = {
                ...allClients[clientIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };

            await fs.writeFile(this.DATA_FILE, JSON.stringify({"clients": allClients }, null, 2), "utf-8");

            return allClients[clientIndex];
            
        } catch (error) {
            console.error("Error", error.message);
        }
    }

    async createReservation(clientId,roomId){

        const hotelData = await this.loadRooms()

        const rooms =  hotelData['rooms']

        const roomIndex = rooms.findIndex(room => room.id === roomId);

        rooms[roomIndex]['reserved'] = true;
        rooms[roomIndex]['clientId'] = clientId;
        rooms[roomIndex]['reservedAt'] = new Date().toISOString()
        rooms[roomIndex]['cancelReservationAt'] = null

        await fs.writeFile(this.DATA_ROOM_FILE, JSON.stringify({...hotelData,rooms: rooms }, null, 2), "utf-8");

        return rooms[roomIndex]
    }

    async cancelReservation(roomIndex) {

        const hotelData = await this.loadRooms()

        const rooms =  hotelData['rooms']
        
        rooms[roomIndex]['reserved'] = false;
        rooms[roomIndex]['clientId'] = null;
        rooms[roomIndex]['reservedAt'] = null
        rooms[roomIndex]['cancelReservationAt'] = new Date().toISOString()

        await fs.writeFile(this.DATA_ROOM_FILE, JSON.stringify({...hotelData,rooms: rooms }, null, 2), "utf-8");

        return rooms[roomIndex]
    }


}