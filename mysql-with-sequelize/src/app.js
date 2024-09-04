import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// Serve static files from the public directory
app.use(express.static("public"));

//routes import 
import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';


const swaggerOptions = {
    // customCss: '.swagger-ui .topbar { display: none }',
    explorer: true, // Enable Explorer mode
    customSiteTitle: "User Crud APi Documentations", // Custom title for Swagger UI
    customfavIcon: "/logo.png",  // Path to your favicon file
};

// Serve Swagger UI with custom configurations
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerOptions)
);


//routes declaration
app.get("/", (req, res) =>
{
    res.json({
        message: "Welcome to the CRUD API!",
        statusCode: 200,
    });
});

app.use("/api/v1/", userRouter, adminRouter);
// app.use("/api/v1", adminRouter);


export { app };