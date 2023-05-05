const { uuid } = require('uuidv4');
const knex = require('knex')(require('../knexfile'))

//You can get the user_id by calling api/user/profile.
//Need to set up frontend auth for this.


//We're trying to get data for one specific user.
//Expected request body = {user_id}
exports.index = (req, res) => {
    knex('emotion')
    .where({user_id: req.body.user_id})
    .join('user', 'emotion.user_id', 'user.id')
    .then((data) => {
        return res.status(200).json(data);
    })
}

//Posting a new emotion to database.
//SQL takes care of the timestamp and id automatically.
//Expected request body = {positive, negative, top_emotion, user_id}
//Response body = {emotion_id}
//Id of the new emotion
exports.addEmotion = (req, res) => {
    if( !req.body.positive      ||
        !req.body.negative      ||
        !req.body.top_emotion   ||
        !req.body.user_id ){
        return res.status(400).send("Necessary items missing from request body.")
    }
    

    knex('emotion')
    .insert(req.body)
    .then((data) => {
        const res = {
            emotion_id: data,
        }
        res.status(201).json(res);
    })
}

//Expected request body = {user_id}
exports.getEmotion = (req, res) => {
    knex('emotion')
    .where({id: req.params.id})
    .then((data) => {
        return res.status(200).json(data);
    })
}
