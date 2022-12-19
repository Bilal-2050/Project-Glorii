const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");
const app = express();
const User = require("./models/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  console.log('DB Connected');
}

app.get("/", async (req, res) => {
  res.send('hellow from world!!!!')
});

//create users.------------------

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const insertUser = await user.save();
    logger.info('User have been saved in DB');
    res.status(201).send(insertUser);
  } catch (e) {
    logger.error(e);
    res.send(e);
  }
});

//fetch user info--------------------
app.get('/users', async (req, res) => {
  try {
    const _id = req.params.id;
    const getUser = await User.find({}).sort({ "ranking": 1 });
    logger.info('Fetching All Users from DB');
    res.send(getUser);
  } catch (e) {
    logger.error(e);
    res.status(400).send(e);
  }
});

//fetch unique  individual user info.------------------

app.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    const getUser = await User.findById(_id);
    logger.info('Fetching Single User');
    res.send(getUser);
  } catch (e) {
    logger.error(e);
    res.status(400).send(e);
  }
});

//update user info.----------------------

app.patch('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    const getUser = await User.findByIdAndUpdate(_id, req.body);
    logger.info('Updating User');
    res.send(getUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete user.
app.delete('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const getUser = await User.findByIdAndDelete(_id);
    logger.info('Deleting User');
    res.send(getUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(7000, (req, res) => {
  logger.log('info', 'Serving on port 7000')
})