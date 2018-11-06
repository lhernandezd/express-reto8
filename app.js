const express = require('express');
const app = express();
const mongoose = require("mongoose");

//Settings
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
app.use(express.json());

//Database
const { Schema } = mongoose;

const VisitSchema = new Schema ({
  date: Date,
  name: String
})

const Visit = mongoose.model('Visit', VisitSchema);

//Routes
app.get('/', async (req,res) => {
  await Visit.create({
    date: Date(),
    name: req.query.name ? req.query.name : 'Anónimo'
  });

  res.send('<h1>El visitante fue almacenado con éxito</h1>');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});