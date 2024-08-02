const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route:1 Fetch all notes using GET:/api/notes/fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }

})

//Route:2 Add notes using GET:/api/notes/addnote login required
router.post('/addnote',fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await notes.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }

})
//Route:2 Updating notes using PUT:/api/notes/updatenote/:id login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{

    try {
        const {title, description,tag}=req.body;

    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    let note =await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured")
    }
    
})
//Route:3 Deleting notes using DELETE:/api/notes/deletenote/:id login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note})
})
module.exports = router