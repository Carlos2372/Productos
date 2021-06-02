/*jshint esversion: 6 */
// Crear modelo de base de datos

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Formato json el esquema, esto es lo que se deberia de mostrar en la pagina
const ProductSchema = Schema({
    name : String,
    price : {type: Number, default:0},
    // solo puedo mandar estas categorias
    category : {type:String, enum:['computers','phones','accesories']},
    description : String,
    picture : String

});
// Exportar el modulo para exportar el modelo de esquema, osea la tabla por asi decirlo
module.exports = mongoose.model('Product',ProductSchema);