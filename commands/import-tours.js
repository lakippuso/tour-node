const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const tourModel = require('./../models/tourModel');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE_LOCAL, {}).then((con) => {
  console.log('Connected to MongoDB');
});

const data = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8')
);

const importTours = async (req, res) => {
  await tourModel.create(data);
  console.log('Imported all tours');
};
const deleteTour = async (req, res) => {
  await tourModel.deleteMany();
  console.log('Deleted all tours');
};

if (process.argv[2] === '--delete') {
  deleteTour();
} else if (process.argv[2] === '--import') {
  importTours();
}
