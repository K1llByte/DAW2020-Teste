const mongoose = require('mongoose');

const movie_schema = new mongoose.Schema({
    id:     String,
    title:  String,
    year:   Number,
    cast:   [String],
    genres: [String]

    /* list: [Number] */
    /* date: Date, */
    /* bytes: Buffer */
}, 
{
    versionKey: false,
    collection: 'data'
});

module.exports = mongoose.model('movies', movie_schema, 'movies');