const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/todo-lists")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log(err));