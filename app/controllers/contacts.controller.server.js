//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import contactModel from '../models/contacts.js';
import { UserDisplayName } from '../utils/index.js';

export function DisplayContactsList(req, res, next) {
    //find callback if error report or not then render
    contactModel.find(function(err, contactsCollection){
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', {title: 'Contact List', page: 'businessContacts/list', contacts: contactsCollection, displayName: UserDisplayName(req) });
    })
}

export function DisplayContactsAddPage(req, res, next) {
    res.render('index', {title: 'Add Contact', page: 'businessContacts/edit', contacts: {}, displayName: UserDisplayName(req) });
}

//calling model to create.  let new contact name: req.body.name in the body from http POST request looking to the input named name (etc) in edit form (contact name input)
export function ProcessContactsAddPage(req, res, next){
    let newContact = contactModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    
    //create newContact as parameter and redirect back to contact page or if error throw to console log
  
contactModel.create(newContact, (err, Contact) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    })
};

export function DisplayContactsEditPage(req, res, next) {
    let id = req.params.id;
    //if find by id render, else callback the anonymous function to throw error and end response
    contactModel.findById(id, (err, contact) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        //contacts gets passed the contact variable in the html 
        res.render('index', { title: 'Edit Contact', page: 'businessContacts/edit', contacts: contact, displayName: UserDisplayName(req) });
    })


};

export function ProcessContactsEditPage(req, res, next){

  

    let newContact = contactModel({
        _id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    
    //update as parameter and redirect back to contact page or if error throw to console log
contactModel.updateOne({_id: req.body.id }, newContact, (err, Contact) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/contact-list')
    })
};

export function ProcessContactsDelete(req, res, next) {
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/contact-list');
    })
};


