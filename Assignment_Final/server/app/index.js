const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('../config.json');

const employeeController = require('./controllers/employee');
const floorPlanController = require('./controllers/floorPlan');

mongoose.Promise = global.Promise; // Use native Node promises
mongoose.connect(config.mongoConnectionString, { config: { autoIndex: false } }, (err) => {
  if (err) {
    throw(err);
  } else {
    console.log('Connection with MongoDB server established.');

//     const SeatSchema = require('./models/SeatSchema');
//     const OfficeSchema = require('./models/OfficeSchema');
//     const FloorPlanModel = require('./models/FloorPlanModel');
//     const plan = require('./controllers/Floor');
//     const office = {
//       name: 'Headquaters of Ciklum in Ukraine',
//       address: '12 Amosova St. 03680, Kyiv, Ukraine',
//     };
//     const seats = [
//       {
//         "name": "ml5s0",
//         "occupant": "581aeb27f241ec0037e875ad",
//         "position": {
//           "x": 180,
//           "y": 25
//         }
//       },
//       {
//         "name": "ml5s1",
//         "occupant": null,
//         "position": {
//           "x": 180,
//           "y": 65
//         }
//       },
//       {
//         "name": "ml5s2",
//         "occupant": "581aeb27f241ec0037e875af",
//         "position": {
//           "x": 260,
//           "y": 15
//         }
//       },
//       {
//         "name": "ml5s3",
//         "occupant": null,
//         "position": {
//           "x": 260,
//           "y": 60
//         }
//       },
//       {
//         "name": "ml5s4",
//         "occupant": "581aeb27f241ec0037e875ae",
//         "position": {
//           "x": 260,
//           "y": 105
//         }
//       },
//       {
//         "name": "ml5s5",
//         "occupant": "581aeb27f241ec0037e875b1",
//         "position": {
//           "x": 215,
//           "y": 120
//         }
//       }
//     ];
// // const seats = s.map(s => new SeatSchema({
// //   name: s.name,
// //   position: s.position,
// //   occupant: s.occupant,
// // }));
//     const floor = new FloorPlanModel({
//       office,
//       name: '5th Floor',
//       plan,
//       seatRadius: 10,
//       seats,
//     });
//     floor.save((err) => {
//       if(err) {
//         console.log(err);
//       }
//     });

  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use((req, res, next) => {
  // console.log(req);
  next();
});

// Add routes
const router = express.Router();

// Create endpoint handlers for /employee
// router.get('/employee/', employeeController.employeesBootstrap);
router.get('/employee/find/:query?', employeeController.findEmployees);
router.get('/employee/findbyname/:query?', employeeController.findEmployeesByName);
router.get('/employee/detail/:id', employeeController.getEmployeeDetail);
router.get('/employee/photo/:id', employeeController.getEmployeePhoto);

// Create endpoint handlers for /floorplan
router.get('/floorplan/:plan', floorPlanController.getFloorPlan);

router.post('/seat/floorplan/:plan', floorPlanController.addSeat);
router.put('/seat/floorplan/:plan', floorPlanController.updateSeat);
router.delete('/seat/floorplan/:plan', floorPlanController.deleteSeat);

// Register all our routes with /api
app.use('/api', router);

module.exports = app;
