import { configDotenv } from "dotenv";
import { connectDB } from "./dbConfig/index.js";
import { app } from "./app.js";
configDotenv();

connectDB().then(() =>
{
    app.on("error", (error) =>
    {
        console.error("ERROR Connecting to Database", error);
        throw error
    });

    app.listen(process.env.PORT || 8000, () =>
    {
        console.log(`Server running on port ${process.env.PORT || "8000"}`);
    })
}).catch((err) =>
{
    console.log("Database Connection failed!", err);
})