import express from "express";

import adminRoutes from "./routes/admin.route.js";
import clientRoutes from "./routes/client.route.js";
import {errorHandler} from "./src/middlewares/error.handler.js";
import { swaggerSpec } from "./swagger/swagger.config.js";
import swaggerUi from "swagger-ui-express";
import 'dotenv/config';


const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

// 🔹 Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});