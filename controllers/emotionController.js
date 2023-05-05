const knex = require('knex')(require('../knexfile'))
const express = require('express');

exports.getEmotion = (_req, res) => {
    knex('emotion').then((data) => {
        res.status(200).json(data);
    })
}

exports.addEmotion = (req, res) => {
    if( !req.body.positive      ||
        !req.body.negative      ||
        !req.body.top_emotion   ||
        !req.body.user_id ){
            
        }

}

