export const ClientError = {
  ROOM_NOT_FOUND: {
    statusCode: 404,
    message: "Room not found or already reserved"
  },
  ROOM_NOT_RESERVED: {
    statusCode: 404,
    message: "Room not reserved to be canceled"
  },
  INPUT_ERROR:{
    statusCode:401,
    message: "Please verify your input"
  },
  CLIENT_NOT_FOUND: {
    statusCode: 404,
    message: "Client not found"
  },
  CLIENT_NOT_AUTHORIZED:{
    statusCode:401,
    message: "Client not authorized to cancel reservation"
  }
}