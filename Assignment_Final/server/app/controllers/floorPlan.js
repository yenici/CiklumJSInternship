const FloorPlan = require('../models/FloorPlanModel');

exports.getFloorPlan = (req, res) => {
  FloorPlan.findById(req.params.plan, function(err, floorPlan) {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400).send('Bad request. Floor plan ID is incorrect.');
      } else {
        res.status(500).send('Server error on finding the floor.');
      }
    } else if (floorPlan === null) {
      res.status(404).send(`No office found by id = ${req.params.plan}.`);
    } else {
      const seatsRes = floorPlan.seats.map(seat => ({
        id: seat.id,
        name: seat.name,
        position: seat.position,
        occupant: seat.occupant,
        occupantUrl: seat.occupant ?
          `${req.protocol}://${req.get('host')}/api/employee/detail/${seat.occupant}` :
          null,
      }));
      res.send({
        office: floorPlan.office,
        floor: {
          id: floorPlan.id,
          name: floorPlan.name,
          plan: floorPlan.plan,
        },
        seatRadius: floorPlan.seatRadius,
        seats: seatsRes,
      });
    }
  });
};

// /seat/floorplan/:plan
exports.addSeat = (req, res) => {
  const seat = {
    name: req.body.name,
    occupant: req.body.occupant,
    position: req.body.position,
  };
  FloorPlan.findByIdAndUpdate(
    req.params.plan,
    { $push: { seats: seat } },
    { new: true, upsert: true },
    function(err, floorPlan) {
      if (err) {
        if (err.name === 'CastError') {
          res.status(400).send('Bad request. Floor plan ID is incorrect.');
        } else {
          res.status(500).send('Server error on finding the floor.');
        }
      } else {
        const seatsRes = floorPlan.seats.map(seat => ({
          id: seat.id,
          name: seat.name,
          position: seat.position,
          occupant: seat.occupant,
          occupantUrl: seat.occupant ?
            `${req.protocol}://${req.get('host')}/api/employee/detail/${seat.occupant}` :
            null,
        }));
        res.json({seats: seatsRes});
      }
    }
  );
};

// floorplan/:plan/seat/:seat
exports.updateSeat = (req, res) => {
  const seat = {
    _id: req.body.id,
    name: req.body.name,
    occupant: req.body.occupant,
    position: req.body.position,
  };
  console.log(seat);
  console.log(req.params.plan);
  res.status(200);
};

// exports.upsertSeat = (req, res) => {
//   FloorPlan.update({ '_id': req.body.floorPlanId, 'seat._id': req.body.seat.id },
//     { $set: { 'seat.$.name': req.body.seat.name, 'seat.$.occupant': req.body.seat.occupant, 'seat.$.position': req.body.seat.positioon } });
//   // req.body.officeId
//   // req.body.floorId
//   // req.body.seat = {
//   // id,
//   // name
//   // occupant
//   // position; {x, y}
//   // }
//
//   Favorite.findByIdAndUpdate( // TODO: Check for duplicate
//     req.user.id,
//     { $push: { Movies:  req.body.movie } },
//     { new: true, upsert: true },
//     function(err, movie) {
//       if (err) {
//         errorLogger(err, 'Server error on adding movie to favorites.');
//         res.json({
//           success: false,
//           message: 'Server error on adding movie to favorites.',
//         });
//       } else {
//         res.json({
//           success: true,
//           message: `Movie with imdbID = ${movie.imdbid} was added to favorites.`,
//         });
//       }
//     }
//   );
//
//   Office.findById(req.body.officeId, function(err, office) {
//     if (err) {
//       if (err.name === 'CastError') {
//         res.status(400).send('Bad request. Office ID is incorrect.');
//       } else {
//         res.status(500).send('Server error on finding the floor.');
//       }
//     } else if (office === null) {
//       res.status(404).send(`No office found by id = ${req.params.office}.`);
//     } else {
//       const floorRes = office.floors.find(floor => floor.id === req.bodys.floorId);
//       if (floorRes) {
//
//         const seatsRes = floorRes.seats.map(seat => ({
//           id: seat.id,
//           name: seat.name,
//           position: seat.position,
//           occupant: seat.occupant,
//           occupantUrl: seat.occupant ?
//             `${req.protocol}://${req.get('host')}/api/employee/detail/${seat.occupant}` :
//             null,
//         }));
//         res.send({
//           office: {
//             id: office.id,
//             name: office.name,
//             address: office.address,
//           },
//           floor: {
//             id: floorRes.id,
//             name: floorRes.name,
//             plan: floorRes.plan,
//           },
//           seatRadius: floorRes.seatRadius,
//           seats: seatsRes,
//         });
//
//       } else {
//         res.status(404).send(`No floor found in office '${office.name}' by id = ${req.body.floorId}.`);
//       }
//     }
//   });
// };
