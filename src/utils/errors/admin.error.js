export const AdminError = {
  CLIENT_NOT_FOUND: {
    statusCode: 404,
    message: "Client not found"
  },
  ROOM_NOT_FOUND:{
    statusCode: 404,
    message: "Room not found"
  },
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Validation failed",
  },
  CLIENT_ALREADY_EXISTS: {
    statusCode: 409,
    message: "Client already exists"
  },
  CLIENT_ATTRIBUTES_ALREADY_SET: {
    statusCode: 409,
    message: "Client already has their attributes"
  },
  RESERVATION_ALREADY_RESERVED: {
    statusCode: 409,
    message: "Room is already reserved." 
  },
  INPUT_ERROR:{
    statusCode:401,
    message: "Please verify your input"
  },
  ROOM_NOT_RESERVED: {
    statusCode: 409,
    message: "Room not reserved to be canceled"
  },
  CLIENT_NOT_AUTHORIZED:{
    statusCode:400,
    message: "Unable to cancel the reservation because it is not assigned to this client"
  },
}