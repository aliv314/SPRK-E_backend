const { uuid } = require('uuidv4');
const knex = require('knex')(require('../knexfile'))

//We're trying to get data for one specific user.
//Expected req.body = {user_id}
exports.index = (req, res) => {
    knex('emotion')
    .where({user_id: req.body.user_id})
    .join('user', 'emotion.user_id', 'user.id')
    .then((data) => {
        res.status(200).json(data);
    })
}

// exports.addEmotion = (req, res) => {
//     if( !req.body.positive      ||
//         !req.body.negative      ||
//         !req.body.top_emotion   ||
//         !req.body.user_id ){
            
//         }

// }



