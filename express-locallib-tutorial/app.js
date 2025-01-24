const createError = require('http-errors');
const express = require('express');

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://Cluster0:xUnpVwmxQUPvypSE@cluster0.pxl60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main(){
  const conn = mongoose.connect(mongoDB);
}

// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.on('connected', async () => {
//     console.log('Connected to MongoDB');

//     try {
//         await mongoose.connection.db.dropDatabase();
//         console.log('Database dropped successfully!');
//     } catch (error) {
//         console.error('Error dropping database:', error);
//     } finally {
//         mongoose.connection.close(); // Close the connection
//     }
// });
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
// const auth_middleware = require('../middleware/authmiddleware');


const app = express();

require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client origin
    credentials: true, // Allow credentials (cookies)
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
const PORT = process.env.PORT || 3000
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
