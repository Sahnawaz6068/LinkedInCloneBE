import express from 'express';
import apiRoute from './routes/index.js'
import config from './config/index.js';


const PORT= config.serverConfig.PORT;
const connectionDB=config.dbConfig.connectDB;
const app = express();


// app.get("/check",(req,res)=>{
//     res.send("Chal gaya mai")
// })
//API END POINT
app.use('/api',apiRoute);

async function startApp() {
  try {
    await connectionDB();
    console.log("DB is connected")
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    console.log("something wrong happen");
  }
}

startApp();