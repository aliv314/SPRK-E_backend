//We're trying to get all entries for one specific user.
//Expected request body = {user_id}
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
        const res = {
            entry_id: data,
        }
        res.status(201).json(res);
    })
}