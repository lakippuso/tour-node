const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

// router.param('id', tourController.checkID);
// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.validateBody, tourController.addTour);
// router
//   .route('/:id')
//   .get(tourController.getTours)
//   .put(tourController.validateBody, tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
