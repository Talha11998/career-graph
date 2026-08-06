import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import personRoutes from "./routes/personRoutes.js";


dotenv.config();


const app=express();


app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{

    res.json({
        status:"Career Graph API running"
    });

});

app.use(
"/api/person",
personRoutes
);



app.use(
(err,req,res,next)=>{

    res.status(500)
    .json({
        error:"Something went wrong"
    });

});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running`);
});