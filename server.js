const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {}).then((con) => {
  // console.log(con.connections);
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
