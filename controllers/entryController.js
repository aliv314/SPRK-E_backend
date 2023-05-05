//We're trying to get all entries for one specific user.
//Expected request body = {user_id}
const { uuid } = require('uuidv4');
const knex = require('knex')(require('../knexfile'))

//Response body = [] array of entries
exports.index = (req, res) => {
    knex('entry')
    .where({user_id: req.body.user_id})
    .join('user', 'entry.user_id', 'user.id')
    .then((data) => {
        return res.status(200).json(data);
    })
}

//Posting a new entry to database.
//SQL takes care of the timestamp and id automatically.
//Expected request body = {positive, negative, top_entry, user_id}
//Response body = {entry_id}
//Id of the new entry
exports.addEntry = (req, res) => {
    if( !req.body.entry   ||
        !req.body.user_id ){
        return res.status(400).send("Necessary items missing from request body.")
    }
    

    knex('entry')
    .insert(req.body)
    .then((data) => {
        //Id of the new entry
        const res = {
            entry_id: data,
        }
        res.status(201).json(res);
    })
}

//No request body expected.
exports.getEntry= (req, res) => {
    knex('entry')
    .where({id: req.params.id})
    .then((data) => {
        return res.status(200).json(data);
    }).catch((error) => {
        return res.status(400).send(Error, "Error!")
    })
}

//Expected req body = {entry}
exports.putEntry = (req,res) => {
    if(!req.body.entry){
        return res.status(403).send("Please submit an input with your request");
    }
    //Highly suggest making a new emotion entry when the user goes back to edit an entry.
    try{
        knex('entry')
        .where({id : req.params.id})
        .update(req.body);
    }catch{
        return res.status(404).send("Something went wrong.")
    }
    
}

exports.deleteEntry = (req, res) => {
    try{
        knex('entry')
        .delete()
        .where({id:req.params.id})
        res.status(200).send("Success!");
    }catch{
        return res.status(404).send("Something went wrong.");
    }
}