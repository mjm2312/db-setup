/*
Mongoose acts as a front end to MongoDB, an open source NoSQL database that uses a document-oriented data model. 
A “collection” of “documents” in a MongoDB database is analogous to a “table” of “rows” in a relational database.
*/
const mongoose  = require('mongoose');
//define a cnonection with mongoose.connect
mongoose.connect('mongodb://localhost/CowlistDemo')


//Models defined through the schema interface
//each model maps to a collection of documents in the MongoDB database
//Schemas are "compiled" into models using the mongoose.model method. 
//Once you have a model you can use it to CRUD objects of the given type

//the documents will contain the fields defined in the model Schema
let Cow = mongoose.Schema({
   name: String,
   description: String
 })

 //creates interface to database to CRUD documents
const CowModel = mongoose.model('Cow', Cow)

module.exports = CowModel;

