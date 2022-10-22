//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import { Router } from "express";
import { Add, Delete, Edit, Get, GetList } from "../../controllers/api/contacts-api.controller.server.js";

const router = Router();

// REST API VERBS

router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);


export default router;