const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
//const methodOverride = require('method-override');

var index_router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req,res,next) => {
    if(req.query.token)
    {
        console.log("Bearer Token:",req.query.token);
        jwt.verify(req.query.token,'DAW2020', (e,payload) => {
            if(e)
            {
                res.status(401).jsonp({ error : e });
            }
            else
            {
                req.user = { 
                    lvl : payload.lvl,
                    username : payload.username
                };
                next();
            }
        });
        //// 401 Unauthorized
        //next();
    }
    else
    {
        console.log("erro1");
        res.status(401).jsonp({error: 'Invalid token or non-existing'});
    }
}); */

// Routes
app.use('/', index_router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('error',{ "err" : err });
});

module.exports = app;
