import swaggerJsdoc from "swagger-jsdoc";

import 'dotenv/config';


const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Hotel",
      version: "1.0.0",
      description: "Documentation de l'API (Admin + Client)",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Serveur local",
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/*.yaml"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
