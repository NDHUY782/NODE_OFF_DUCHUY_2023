var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
const expressLayouts = require("express-ejs-layouts");
var logger = require('morgan');
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');

const session = require('express-session');

const db = require('./configs/db')
var indexRouter = require('./routes/index');

var app = express();
db.connect()

app.use(cookieParser());
app.use(session({
    secret: 'abcsdf',
    resave: false,
    saveUninitialized: true
}));
app.use(flash(app));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts)
app.set("layout", "index");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.render('error');
});

module.exports = app;
