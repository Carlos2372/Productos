/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const config = require('./config');

const app = express();
// localhost
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host,()=>{
    console.log('El servidor esta funcionando');
});

// importar variable
require('dotenv').config({path: 'variables.env'});
// con este accedemos a la base
console.log(process.env.DB_URL);


// config para body-parser
app.use(express.urlencoded({extended: false}));

// $ npm i -S method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// comunicacion entre front y back end
app.use(express.json());

// motor de vistas
app.engine('.hbs', hbs({
    defaultLayout : 'index',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// Declaracion de carpeta STATIC
// app.use('/static',express.static('public'));
app.use(express.static('public'));
// route our app
const router = require('./routes/routes');
app.use('/', router);

//Conexion a BD y levantar Servidor
mongoose.connect(process.env.DB_URL,{    
        useNewUrlParser: true,
        useCreateIndex: true ,
        useUnifiedTopology: true,
        useFindAndModify: false ,
    });