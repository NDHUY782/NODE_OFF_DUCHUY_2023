var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
const expressLayouts = require("express-ejs-layouts");
var logger = require('morgan');
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');

const configPath = require('./path');

// Define Path
global.__base               = __dirname + '/';
global.__path_configs       = __base + configPath.folder_configs + '/';
global.__path_controllers   = __base + configPath.folder_controllers + '/';
global.__path_helpers       = __base + configPath.folder_helpers + '/';
global.__path_models        = __base + configPath.folder_models + '/';
global.__path_public        = __base + configPath.folder_public + '/';
global.__path_routes        = __base + configPath.folder_routes + '/';
global.__path_services      = __base + configPath.folder_services + '/';
global.__path_utils         = __base + configPath.folder_utils + '/';
global.__path_validator     = __base + configPath.folder_validator + '/';
global.__path_views         = __base + configPath.folder_views + '/';



const db = require(`${__path_configs}db`);
const systemConfig = require(`${__path_configs}system`);
var indexRouter = require(`${__path_routes}index`);

var app = express();
db.connect();

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

// Local variable
app.locals.systemConfig       = systemConfig;
app.locals.moment             = moment;

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
