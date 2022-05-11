import express from "express";
import fileUpload from "express-fileupload"
import { config } from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.routes.js";
import { dbConnection } from "./db.js"; 
import path from "path";
const __dirname = path.resolve();


const app = express();  
config({
    path: __dirname + "/.env.local"
});


const port = process.env.PORT || 3000;
dbConnection()

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}));
app.use(cors({
    origin: "http://localhost:3000"
}))


app.use(postRoutes)

app.use(express.static(path.join(__dirname, "/client/build")));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})