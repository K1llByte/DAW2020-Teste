const { db } = require('../models/movie');
const Movie = require('../models/movie');

// TODO OPERATIONS:
// list_all()
// add(user_data)
// get(username)
// set(user_data)
// delete(user_data)

// Returns student list
module.exports.list_all = () => {
    return Movie
        .find({},{ '_id':0, title:1 , year:1 })
        /* .sort({ username : 1 }) */
        .exec();
}

module.exports.get = (mid) => {
    return Movie
        .findOne({ '_id':0, 'id': mid })
        .exec();
}

module.exports.list_actors = (uname) => {
    return Movie
        .distinct("cast")
        .sort()
        //.find({},{ '_id':0, 'cast':1 },{ dropDups:1 })
        //.map(function(m) {emit("cast",m.cast,)} )
        .exec();
}



module.exports.list_qnt_actors = (uname) => {
    return Movie
    .find({},{ _id:0, id:1, title:1, qnt: { $size: "$cast" } })
        .exec();
}


module.exports.list_by_genre = () => {
    return Movie
        .aggregate([
            { $unwind : "$genres" },
            {"$group": {"_id" : "$genres",filmes:{$push:{title: "$title",id: "$id"}}}}
        ])
        .exec();
}

module.exports.list_by_actor = () => {
    return Movie
        .aggregate([
            { $unwind : "$cast" },
            {"$group":{"_id" : "$cast",filmes:{$push:{title: "$title",id: "$id"}}}}
        ])
        .exec();
}