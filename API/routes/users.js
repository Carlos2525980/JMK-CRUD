/**
 * Função para realizar o crud na Api, associando com o banco de dados. 
 */

import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controller/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router