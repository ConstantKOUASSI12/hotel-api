import path from "path";
import { promises as fs } from "fs";

export default class ClientModel { 

    constructor() {
        this.DATA_ROOM_FILE = path.resolve("./data/hotel.json");
        this.DATA_FILE = path.resolve("./data/clients.json");
    }

    async loadClients() {
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

    async getHotelInformations(){
        try {
            const data = await fs.readFile(this.DATA_ROOM_FILE, "utf8");
            const result = JSON.parse(data)
            return result
        } catch (err) {
            console.error("Error reading hotel.json:", err.message);
            return result = [];
        }
    }

    async findRoomById(roomId) {
        const room = await this.getHotelInformations()
        const data = room['rooms'].find((c) => c.id === roomId);

        // if (data?.reserved) return null

        return data
    }

    async findClientById (id){
        const client = await this.loadClients()
        return client.find((c) => c.id === id);
    }

    async createReservation(clientId,roomId){

        const hotelData = await this.getHotelInformations()

        const rooms =  hotelData['rooms']

        const roomIndex = rooms.findIndex(room => room.id === roomId);

        rooms[roomIndex]['reserved'] = true;
        rooms[roomIndex]['clientId'] = clientId;
        rooms[roomIndex]['reservedAt'] = new Date().toISOString()
        rooms[roomIndex]['cancelReservationAt'] = null

        await fs.writeFile(this.DATA_ROOM_FILE, JSON.stringify({...hotelData,rooms: rooms }, null, 2), "utf-8");

        return rooms[roomIndex]
    }

    async cancelReservation(roomId){

        const hotelData = await this.getHotelInformations()

        const rooms =  hotelData['rooms']

        const roomIndex = rooms.findIndex(room => room.id === roomId);

        rooms[roomIndex]['reserved'] = false;
        rooms[roomIndex]['clientId'] = null;
        rooms[roomIndex]['reservedAt'] = null
        rooms[roomIndex]['cancelReservationAt'] = new Date().toISOString()

        await fs.writeFile(this.DATA_ROOM_FILE, JSON.stringify({...hotelData,rooms: rooms }, null, 2), "utf-8");

        return rooms[roomIndex]

    }
}