const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");

router.get('/fetchallnotes', fetchuser, async(req,res) => {
    const notes = await Note.find({user:req.user.id})
    res.json(notes);
});

router.post('/addnote',fetchuser,[
    body('title').isLength({min : 3}),
    body('description').isLength({min : 5})
],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()}); 
        }
        const note = new Note({
            title,description,tag,user : req.user.id
        })
        const saveNote = await note.save();
        
        res.json(saveNote);


    } catch (error) {
        res.status(400).send("Internal Server Error");
    }
});

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        let updateNote = {};

        if(title){
            updateNote.title = title;
        }
        if(description){
            updateNote.description = description;
        }
        if(tag){
            updateNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:updateNote},{new:true});

        res.json(note);

    } catch (error) {
        return res.status(400).send("Internal Server Error");
    }
});

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        let note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({"Success": "Note has been deleted" ,note});

    } catch (error) {
        return res.status(400).send("Internal Server Error");
    }
});

module.exports = router;