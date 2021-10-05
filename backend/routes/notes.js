const express = require("express");
const notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router()
const { body, validationResult } = require('express-validator');

//Route 1  Get all notes   detail using Post "/api/notes/fetchallnotes" . login    required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const note = await notes.find({ user: req.user.id });

        res.json(note)

    } catch (error) {

        return res.status(500).send({ error: " invalid server data" })

    }

})


//Route 2  add new notes   using Post "/api/notes/addnotes" . login    required
router.post('/addnotes', fetchuser,
    [
        body('title', "Enter a valid title").isLength({ min: 5 }),
        body('description', 'enter a valid description').isLength({ min: 5 }),

    ], async (req, res) => {

        const { title, description, tag } = req.body;

        //if there are errpr , return bad request and thr error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            const note = await new notes({

                title, description, tag, user: req.user.id
            })

            const savednote = await note.save()

            res.json(savednote)

        } catch (error) {

            return res.status(500).send({ error: " invalid server data" })

        }

    })


//Route 3   update notes   using put "   /api/notes/updatenotes/:id" " . login    required

router.put('/updatenotes/:id', fetchuser,
    async (req, res) => {

        try {
            
                    const { title, description, tag } = req.body;
            
                    // create newnotes object 
                    const newnode = {};
            
                    if (title) { newnode.title = title }
                    if (description) { newnode.description = description }
                    if (tag) { newnode.tag = tag }
            
            
            
                    //find the note to be updated    and update it
            
                    let note = await notes.findById(req.params.id)
                    if (!note) { return res.status(404).send("Not found") }
            
                    if (note.user.toString() !== req.user.id) {
            
                        return res.status(401).send("not allowed")
                    }
            
                    note = await notes.findByIdAndUpdate(req.params.id, { $set: newnode }, { new: true })
                    res.json({ note });
                }
            
                catch (error) {
                    return res.status(500).send({ error: " internal server error" }) 
                }
            }
        )   
        
        


//Route 4  delete notes   using delete " /api/notes/deletenotes/:id " . login    required


router.delete('/deletenotes/:id', fetchuser,
    async (req, res) => {

        //    const {title , description ,tag} = req.body;

        //    // create newnotes object 
        //    const newnode= {};

        //    if(title){newnode.title = title}
        //    if(description){newnode.description = description}
        //    if(tag){newnode.tag = tag}


        try {
            //find the note to be deleted    and delete it

            let note = await notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not found") }


            // allow deletion only if  user own this note
            if (note.user.toString() !== req.user.id) {

                return res.status(401).send("not allowed")
            }

            note = await notes.findByIdAndDelete(req.params.id)
            res.json({ "sucess": "note has been deleted", note: note });
        }
    
        catch (error) {
            return res.status(500).send({ error: " internal server error" }) 
        }
    }
)   



module.exports = router