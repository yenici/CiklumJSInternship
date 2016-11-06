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

exports.updateSeat = (req, res) => {
  const seat = {
    _id: req.body.id,
    name: req.body.name,
    occupant: req.body.occupant,
    position: req.body.position,
  };
  FloorPlan.findOneAndUpdate(
    { _id: req.params.plan, 'seats._id': seat._id},
    { $set: {
      'seats.$.name': seat.name,
      'seats.$.occupant': seat.occupant,
      'seats.$.position': seat.position,
    } },
    { new: true, multi: false },
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

exports.deleteSeat = (req, res) => {
  const seatId = req.body.id;
  FloorPlan.findByIdAndUpdate(
    req.params.plan,
    { $pull: { seats: { _id: seatId}} },
    { new: true, multi: false },
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
