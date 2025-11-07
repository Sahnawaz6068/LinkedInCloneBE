import express from 'express';

const router = express.Router();

router.get("/post",(req,res)=>{
    res.send("Jab tak ke liye itna hi thik hai");
})

export default router;