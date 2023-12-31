const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');

// 2) ROUTES HANDLERS
const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getToursStats, getAllTours);
router.route('/monthly-plan/:year').get(getMonthlyPlan, getAllTours);
router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
