const { db } = require('../models/baptism');
const Baptism = require('../models/baptism');

// Returns student list
module.exports.list_all = () => {
    return Baptism
        .find({},{ '_id':1, date : 1 , title:1 , ref:1 })
        .exec();
}


module.exports.get = (id) => {
    return Baptism
        .findOne({},{})
        .exec();
}

module.exports.list_titles = () => {
    return Baptism
        .find({},{ '_id':0, title:1 })
        .exec();
}

module.exports.list_parents = () => {
    return Baptism
        .find({},{ '_id':1, pai:1, mae:1 })
        .exec();
}



module.exports.list_from_year = (year) => {
    return Baptism
        .find({ 'date' : { $regex : `${year}-[0-9]{2}-[0-9]{2}` } },{ '_id':1, date : 1 , title:1 , ref:1 })
        .exec();
}

module.exports.list_stats = () => {
    return Baptism
    .aggregate( [
        { $project: { date: { $substr: [ "$date", 0, 4 ] } } },
        { $group: { _id: "$date", num_baptisms: { $sum: 1 } } },
        { $project: { _id: 0, "year": "$_id", "num_baptisms": 1  } }
    ] )
    .exec();
}


// module.exports.get = (mid) => {
//     return Baptism
//         .findOne({ '_id':0, 'id': mid })
//         .exec();
// }

// module.exports.list_actors = (uname) => {
//     return Baptism
//         .distinct("cast")
//         .sort()
//         //.find({},{ '_id':0, 'cast':1 },{ dropDups:1 })
//         //.map(function(m) {emit("cast",m.cast,)} )
//         .exec();
// }



// module.exports.list_qnt_actors = (uname) => {
//     return Baptism
//     .find({},{ _id:0, id:1, title:1, qnt: { $size: "$cast" } })
//         .exec();
// }


// module.exports.list_by_genre = () => {
//     return Baptism
//         .aggregate([
//             { $unwind : "$genres" },
//             {"$group": {"_id" : "$genres",filmes:{$push:{title: "$title",id: "$id"}}}}
//         ])
//         .exec();
// }

// module.exports.list_by_actor = () => {
//     return Baptism
//         .aggregate([
//             { $unwind : "$cast" },
//             {"$group":{"_id" : "$cast",filmes:{$push:{title: "$title",id: "$id"}}}}
//         ])
//         .exec();
// }