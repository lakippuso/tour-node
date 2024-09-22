const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      required: [true, 'A tour must have a name'],
      type: String,
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      // enum: {
      //   values: ['easy', 'medium', 'difficult'],
      //   message: 'Difficulty must be either easy, medium, or difficult',
      // },
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      // validate: {
      //   validator: function (value) {
      //     return value >= 0 && value <= 100;
      //   },
      //   message: 'Discount must be between 0 and 100',
      // },
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
      // required: [true, 'A tour must have at least one start date'],
    },
  },
  { versionKey: false }
);

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
