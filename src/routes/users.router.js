import { Router } from "express";
import UserModel from "../models/users.model.js";

const router = Router();

router.get("/", async(_, res) => {
    res.json(await UserModel.find())
});

router.get("/:id", async(_, res) => {
    res.json(await UserModel.find())
});
88
router.delete("/:id", async(_, res) => {
    
});

export default router