const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('../config.json');

const authController = require('./controllers/authenticate');
const employeeController = require('./controllers/employee');
const floorPlanController = require('./controllers/floorPlan');

mongoose.Promise = global.Promise; // Use native Node promises
mongoose.connect(config.mongoConnectionString, { config: { autoIndex: false } }, (err) => {
  if (err) {
    throw(err);
  } else {
    console.log('Connection with MongoDB server established.');
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./controllers/passport')(passport);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Add routes
const router = express.Router();

// Create endpoint handlers for security
router.post('/authenticate', authController.authenticateUser);
router.post('/signin', authController.createUser);


// Create endpoint handlers for /employee
// router.get('/employee/', employeeController.employeesBootstrap);
router.get('/employee/find/:query?', employeeController.findEmployees);
router.get('/employee/findbyname/:query?', employeeController.findEmployeesByName);
router.get('/employee/detail/:id', employeeController.getEmployeeDetail);
router.get('/employee/photo/:id', employeeController.getEmployeePhoto);

// Create endpoint handlers for /floorplan
router.get('/floorplan/:plan', floorPlanController.getFloorPlan);

// Create endpoint handlers for /seat
// router.get('/favorites', passport.authenticate('jwt', { session: false }), favoritesController.favoritesGet);
router.post(
  '/seat/floorplan/:plan',
  passport.authenticate('jwt', { session: false }),
  floorPlanController.addSeat
);
router.put(
  '/seat/floorplan/:plan',
  passport.authenticate('jwt', { session: false }),
  floorPlanController.updateSeat
);
router.delete(
  '/seat/floorplan/:plan',
  passport.authenticate('jwt', { session: false }),
  floorPlanController.deleteSeat
);
// router.post('/seat/floorplan/:plan', floorPlanController.addSeat);
// router.put('/seat/floorplan/:plan', floorPlanController.updateSeat);
// router.delete('/seat/floorplan/:plan', floorPlanController.deleteSeat);

// Register all our routes with /api
app.use('/api', router);

module.exports = app;
