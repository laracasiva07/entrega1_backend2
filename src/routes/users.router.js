import { Router } from "express";
import UserModel from "../models/users.model.js";

const router = Router();

router.get("/", async(_, res) => {
    res.json(await UserModel.find())
});

router.get("/:id", async(_, res) => {
    res.json(await UserModel.findById(req.params.id));
});

router.delete("/:id", async(_, res) => {
    res.json(await UserModel.deleteOne({_id: req.params.id}));
});

export default router