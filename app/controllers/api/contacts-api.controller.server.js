//Matthew Briffett 301247484 Centennial College COMP229 Fall 2022

import contactsModel from '../../models/contacts.js'

export function GetList(req, res, next){
    moviesModel.find((err, contactsCollection) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            contacts: contactsCollection, 
            user: req.user
        });
    });
}

export function Get(req, res, next){
    let id = req.params.id;

    contactsModel.findById(id, (err, contact) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        return res.json({
            success: true, 
            msg: 'Success',
            contact, 
            user: req.user
        })
    })
}

export function Add(req, res, next){
    let newContact = new contactsModel({
        ...req.body
    });

    moviesModel.create(newContact, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        // movie added successfully
        res.json({
            success: true, 
            msg: 'Success',
            contact: newContact
        })
    })
}

export function Edit(req, res, next){
    let id = req.params.id;

    let updatedContact = new contactsModel({
        "_id": id, 
        ...req.body
    });

    moviesModel.updateOne({_id: id}, updatedContact, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            contact: updatedContact
        })
    })

   
}

export function Delete(req, res, next){
    let id = req.params.id;

    moviesModel.remove({_id: id}, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Deleted Succesfully'
        })
    })
}
