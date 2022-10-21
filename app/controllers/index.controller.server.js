//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

//index controller
export function displayHome(req, res, next){
    //renders index view - views path set in server.js
    //varaibles in JSON object are made available to index.ejs (filename, { variableName: "value" })
   res.render('index', { title: 'Home', page: 'home' });
};

export function displayAbout(req, res, next){
    res.render('index', {title: 'About', page: 'about'})
};

export function displayContact(req, res, next){
    res.render('index', {title: 'Contact', page: 'contact'})
};

export function displayProjects(req, res, next){
    res.render('index', {title: 'Projects', page: 'projects'})
};

export function displayServices(req, res, next){
    res.render('index', {title: 'Services', page: 'services'})
};
export function downloadResume(req, res, next){
    res.download('public/content/files/MatthewBriffett-Resume2.pdf');
}



