const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());



app.use(cors());

const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL+process.env.DB_NAME

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected sucessfully...."))
  .catch((err) => console.log("Mongodb connection failed", err.message));



app.use('/', TodoItemRoute);
app.use('/user/reg',userRegister)
app.use('/user/login',userLogin)

app.listen(PORT, console.log(`Server listening on ${PORT}...`));
