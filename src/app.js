import express from 'express';
import apiRoute from './routes/index.js';
import config from './config/index.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = config.serverConfig.PORT;
const connectionDB = config.dbConfig.connectDB;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};


app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', apiRoute);


async function startApp() {
  try {
    await connectionDB();
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    console.log("something wrong happen");
  }
}

startApp();