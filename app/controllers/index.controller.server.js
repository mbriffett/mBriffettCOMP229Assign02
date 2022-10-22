//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import { UserDisplayName } from '../utils/index.js';

//index controller
export function displayHome(req, res, next){
    //renders index view - views path set in server.js
    //varaibles in JSON object are made available to index.ejs (filename, { variableName: "value" })
   res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)} );
};

export function displayAbout(req, res, next){
    res.render('index', { title: 'About', page: 'about', displayName: UserDisplayName(req) });
};

export function displayContact(req, res, next){
    res.render('index', { title: 'Contact', page: 'contact', displayName: UserDisplayName(req) });
};

export function displayProjects(req, res, next){
    res.render('index', { title: 'Projects', page: 'projects', displayName: UserDisplayName(req) });
};

export function displayServices(req, res, next){
    res.render('index', { title: 'Services', page: 'services', displayName: UserDisplayName(req)} );
};
export function downloadResume(req, res, next){
    res.download('public/content/files/MatthewBriffett-Resume2.pdf');
}



