const express = require('express');
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
  _id:  { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
  date: {type: Date, default: Date.now},
  name: String
});

var Visitor = mongoose.model('Visitor', schema);

const app = express();

app.get('/', (req,res) => {
  let name = Object.keys(req.query).length ? req.query.name : 'Anónimo';
  Visitor.create({ name: name }, function(err) {
    if (err) return console.error(err);
  });

  res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
