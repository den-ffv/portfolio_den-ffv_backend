import 'dotenv/config';
import express from 'express';
import cors from "cors"
import router from "./routes";
const app = express()
const port: number = 3000;

app.use(express.json());
app.use(cors())

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})