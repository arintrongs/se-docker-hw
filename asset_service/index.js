const express = require('express');
require('./db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8008;
const userSchema = new mongoose.Schema({
  user_id: String,
  uname: String,
  profile_image: String,
  last_update: Number
});

const userModel = mongoose.model('userModel', userSchema, 'userProfile');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const username = req.query.username;

  const result = await userModel.findOne({ uname: username }).lean();
  return res.status(200).send({ profile_image: result.profile_image });
});
app.listen(port, () => {
  console.log(`Express server is listening at port ${port}`);
});
