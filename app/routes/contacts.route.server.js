//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import { Router } from "express";
import { DisplayContactsList, DisplayContactsAddPage, ProcessContactsAddPage, ProcessContactsEditPage, DisplayContactsEditPage, ProcessContactsDelete } from "../controllers/contacts.controller.server.js";
import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/contact-list', DisplayContactsList);
router.get('/contact-add', AuthGuard, DisplayContactsAddPage);
//post request for adding contact
router.post('/contact-add', AuthGuard, ProcessContactsAddPage);
router.post('/contact-edit/:id', AuthGuard, ProcessContactsEditPage)
//get utilising the id passed by contactModel.find in controller for this function
router.get('/contact-edit/:id', AuthGuard, DisplayContactsEditPage);
router.get('/contact-delete/:id', AuthGuard, ProcessContactsDelete);


export default router;
