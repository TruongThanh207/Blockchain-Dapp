const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const mongoose = require('mongoose');

const router = require('./router/index');


const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://nt0802:love0510@cluster0.ls1ct.mongodb.net/db?retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log(`==== connected to mongodb ====`);
    } else {
      console.log(`==== connected to mongodb failed ====`, err);
    }
  }
);

app.use(router);

app.listen(port, () => {
  console.log(`==== [blockchain demo] listen on port ${port} ====`);
});
