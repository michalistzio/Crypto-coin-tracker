const express = require("express");

const app = express();

const feedRoutes = require('./routes/feed');
const errorController = require('./controllers/error');

app.use('/coins', feedRoutes);

app.use(errorController.get404); 

// error middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

app.listen(8080);
