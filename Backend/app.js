const express = require("express");

const app = express();

const feedRoutes = require('./routes/feed');
const errorController = require('./controllers/error');

//set a headers to avoid CORS Erros (Cross-Origin Resource Sharing) and  make communicate between client and server possible
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
