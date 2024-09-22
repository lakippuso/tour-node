const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!', app: 'Express' });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
