const fs = require('fs');

const tourModel = require('./../models/tourModel');
const { request } = require('http');

exports.addTour = async (req, res) => {
  try {
    const newTour = await tourModel.create(req.body);

    res.status(201).json({ message: 'Success', data: { tour: newTour } });
  } catch (e) {
    res.status(400).json({
      message: e.errorResponse.errmsg,
      status: 'Failed to create tour',
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludFields = ['page', 'sort', 'limit', 'fields'];

    excludFields.forEach((field) => delete queryObj[field]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = tourModel.find(JSON.parse(queryString));

    console.log(req.query);
    if (req.query.sort) {
      let sort = req.query.sort.split(',').join(' ');
      query = query.sort(sort);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').map((field) => field.trim());
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const tours = await query;

    res
      .status(200)
      .json({ message: 'Success', result: tours.length, data: tours });
  } catch (e) {
    res.status(400).json({
      message: e,
      status: 'Failed to load tours',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await tourModel.findById(req.params.id);
    res.status(200).json({ message: 'Success', data: tours });
  } catch (e) {
    res.status(400).json({
      message: e,
      status: 'Failed to create tour',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await tourModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (e) {
    res.status(400).json({
      message: e.errorResponse.errmsg,
      status: 'Failed to delete tour',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: 'Tour updated successfully', data: tour });
  } catch (e) {
    res.status(400).json({
      message: e.errorResponse.errmsg,
      status: 'Failed to update tour',
    });
  }
};

// const data = JSON.parse(
//   fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8')
// );

// Middleware Functions
// exports.checkID = (req, res, next) => {
//   if (req.params.id * 1 > data.length) {
//     return res.status(404).json({ message: 'Invalid ID' });
//   }
//   next();
// };

// exports.validateBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({ message: 'Please provide name and price' });
//   }
//   next();
// };

//Route Functions
// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     message: 'Test',
//     data: data,
//   });
// };

// exports.getTours = (req, res) => {
//   console.log('test');
//   const id = req.params.id;
//   const tour = data.find((tour) => tour.id == id);
//   res.status(200).json({
//     message: 'Success',
//     data: { tour: tour },
//   });
// };

// exports.addTour = (req, res) => {
//   const newId = data[data.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   data.push(newTour);

//   fs.writeFile(
//     './dev-data/data/tours-simple.json',
//     JSON.stringify(data),
//     (error) => {
//       res.status(201).json({ message: 'Success', data: { tour: newTour } });
//     }
//   );
// };

// exports.updateTour = (req, res) => {
//   const id = req.params.id;
//   const tour = data.find((tour) => tour.id == id);
//   const updatedTour = Object.assign(tour, req.body);
//   res.status(200).json({ message: 'Success', data: { tour: updatedTour } });
// };

// exports.deleteTour = (req, res) => {
//   const id = req.params.id;
//   const tour = data.find((tour) => tour.id == id);
//   data = data.filter((tour) => tour.id != id);
//   res.status(200).json({ message: 'Success', data: { tour: tour } });
// };
