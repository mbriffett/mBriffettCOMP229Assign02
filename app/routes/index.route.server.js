//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

//Index routes
//curly braces allow picking specific functions to import rather than the whole file (goes by name, is not just an assigned name in this case)
import { Router } from "express";
import { displayHome, displayAbout, displayContact, displayProjects, displayServices, downloadResume }  from "../controllers/index.controller.server.js";


//Instantiate router
//handles routing for application (instead of app.use)
const router = Router();

//Add middleware to connect application
router.get('/home', displayHome);
router.get('/', displayHome);
router.get('/about', displayAbout);
router.get('/contact', displayContact);
router.get('/projects', displayProjects);
router.get('/services', displayServices);
router.get('/resume', downloadResume);

export default router;