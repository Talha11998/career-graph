import express from "express";

import {
profile,
jobs,
courses
}
from "../controllers/personController.js";


const router=express.Router();


router.get(
"/name/:name",
profile
);


router.get(
"/jobs/:name",
jobs
);


router.get(
"/courses/:name",
courses
);



export default router;