const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get All the notes using: POST "/api/notes/fetchalnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //fetch user id from middleware and get notes by finding user in Notes
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 2: Add a new Note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    //conditions for details of notes
    body('title', 'Enter a valid title (atleast 3 characters)').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        //getting variables from req.body
        const { title, description, tag } = req.body;
        //if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //if there are no errors get 3 values and user id will be same obvsly
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //append note
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})


//ROUTE 3: update a Note using: PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Findthe note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 4: Delete a Note using: PUT "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Findthe note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion only if user owns this not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router;