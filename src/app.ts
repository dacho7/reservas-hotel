import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";
import router from "./routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));
app.use("/api", router);

export default app;
