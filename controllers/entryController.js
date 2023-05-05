//We're trying to get all entries for one specific user.
//Expected request body = {user_id}
const CryptoJS = require('crypto-js')
const knex = require('knex')(require('../knexfile'))


function encrypt(encryptMe){
    const key = process.env.JOURNAL_KEY;
    return CryptoJS.AES.encrypt(encryptMe, key).toString();

}

function decrpyt(decrpytMe){
    const key = process.env.JOURNAL_KEY;
    const bytes = CryptoJS.AES.decrypt(decrpytMe, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

//Response body = [] array of entries
exports.index = (req, res) => {
    knex('entry')
    .where({user_id: req.body.user_id})
    .join('user', 'entry.user_id', 'user.id')
    .select('entry.id', 'entry.entry', 'entry.timestamp')
    .then((data) => {

        //decrpyt entry with map
        const resData = data.map( (entry) => {
            return {
            id: entry.id,
            entry: decrpyt(entry.entry),
            timestamp: entry.timestamp
            }
        })
        

        return res.status(200).json(resData);
    })
}

//Posting a new entry to database.
//SQL takes care of the timestamp and id automatically.
//Expected request body = {entry, user_id}
//Response body = {entry_id}
//Id of the new entry
exports.addEntry = (req, res) => {
    if( !req.body.entry   ||
        !req.body.user_id ){
        return res.status(400).send("Necessary items missing from request body.")
    }
    

    //Encrypting entry
    const entry = {
        user_id: req.body.user_id,
        entry: encrypt(req.body.entry),
    }

    knex('entry')
    .insert(entry)
    .then((data) => {
        //Id of the new entry
        const resData = {
            entry_id: data,
        }
        res.status(201).json(resData);
    })
}

//No request body expected.
exports.getEntry = (req, res) => {
    knex('entry')
    .where({id: req.params.id})
    .then( async (data) => {
        //decrypting entry
        const entryData = {
            id: data.id,
            user_id: data.user_id,
            entry: await decrpyt(data.entry),
            timestamp: data.timestamp
        }
        return res.status(200).json(entryData);
    }).catch((error) => {
        return res.status(400).send(Error, "Error!")
    })
}

// //Expected req body = {entry}
// exports.putEntry = (req,res) => {
//     if(!req.body.entry){
//         return res.status(403).send("Please submit an input with your request");
//     }
//     //Highly suggest making a new emotion entry when the user goes back to edit an entry.
//     try{
//         knex('entry')
//         .where({id : req.params.id})
//         .update(req.body);
//     }catch{
//         return res.status(404).send("Something went wrong.")
//     }
    
// }

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