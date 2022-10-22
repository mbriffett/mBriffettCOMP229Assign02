//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import { Router } from "express";
import { processLogin, processRegistration, processLogout } from "../../controllers/api/auth-api.controller.server.js";

const router = Router();

router.post('/login', processLogin);
router.post('/register', processRegistration);
router.get('/logout', processLogout);

export default router;
