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
  const insertSeat = () => {
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
  if (seat.occupant) {
    // Check if employee has a seat and free that seat
    FloorPlan.findOneAndUpdate(
      { 'seats.occupant': seat.occupant },
      { $set: { 'seats.$.occupant': null } },
      { new: true, multi: false },
      (err, floorPlan) => {
        if (err) {
          res.status(500).send('Server error on finding the floor.');
        } else {
          insertSeat(req, res, seat);
        }
      }
    );
  } else {
    // New seat has no occupant
    insertSeat(req, res, seat);
  }
};

exports.updateSeat = (req, res) => {
  const seatNewState = {
    _id: req.body.id,
    name: req.body.name,
    occupant: req.body.occupant,
    position: req.body.position,
  };
  const updateQuery = (planId, seat) => FloorPlan.findOneAndUpdate(
    { _id: planId, 'seats._id': seat._id},
    { $set: {
      'seats.$.name': seat.name,
      'seats.$.occupant': seat.occupant,
      'seats.$.position': seat.position,
    } },
    { new: true, multi: false }
    ).select('seats');
  const updSeat = (planId, seat) => updateQuery(planId, seat)
    .exec()
    .then(data => res.json({
      seats: data.seats.map(seat => ({
        id: seat.id,
        name: seat.name,
        position: seat.position,
        occupant: seat.occupant,
        occupantUrl: seat.occupant ?
          `${req.protocol}://${req.get('host')}/api/employee/detail/${seat.occupant}` :
          null,
      }))
    }))
    .catch(err => res.status(500).send('Server error on updating the seat.'));
  FloorPlan.findOne({ _id: req.params.plan, 'seats._id': seatNewState._id})
    .select('seats')
    .exec()
    .then(data => {
      const seatOldState = data.seats.find(seat => seat.id == seatNewState._id);
      if (seatNewState.occupant && seatNewState.occupant != seatOldState.occupant) {
        // Prev -> Next
        // ------------
        // null     a   => free previous seat for a
        //  b       a   => swap
        FloorPlan.find({ 'seats.occupant': seatNewState.occupant })
          .select('_id seats')
          .exec()
          .then(data => {
            if (data.length) {
              // The occupant has previous seat
              const occupantPrevSeat = data[0].seats.find(seat => seat.occupant == seatNewState.occupant);
              updateQuery(data[0].id, {
                _id: occupantPrevSeat.id,
                name: occupantPrevSeat.name,
                occupant: seatOldState.occupant,
                position: occupantPrevSeat.position,
              })
                .exec()
                .then(() => {
                  updSeat(req.params.plan, seatNewState);
                })
                .catch(err => {res.status(500).send('Server error on updating occupant\'s previous seat.'); console.log(`2 ${err}`);});
            } else {
              updSeat(req.params.plan, seatNewState);
            }
          })
          .catch(err => {res.status(500).send('Server error on finding occupant\'s previous seat.'); console.log(`3 ${err}`);});
      } else {
        // Prev -> Next
        // ------------
        // null    null   : nothing changes -\
        //  a       a     : nothing changes -+- no extra processing needed
        //  a      null   : free the seat   -/
        updSeat(req.params.plan, seatNewState);
      }
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send('Bad request. Floor plan ID or Seat ID is incorrect.');
      } else {
        res.status(500).send('Server error on finding the floor.');
        console.log(`6 ${err}`);
      }
    });
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
