import 'dotenv/config';
import express, {Express} from 'express';
import cors from "cors"

import router from "./routes";

const app :Express = express()
const port: string|number = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())

app.use("/api", router);

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`)
})