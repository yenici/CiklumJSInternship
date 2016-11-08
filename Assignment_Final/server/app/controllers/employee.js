const mongoose = require('mongoose');
const Employee = require('../models/EmployeeModel');

exports.findEmployees = (req, res) => {
  const query = Employee.find({});
  if (typeof req.params.query === 'string') {
    query.or([
      { firstName: { $regex: req.params.query, $options: 'i' } },
      { lastName: { $regex: req.params.query, $options: 'i' } },
      { email: { $regex: req.params.query, $options: 'i' } },
    ]);
  }
  query.select('id firstName lastName email');
  query.sort({ firstName: 1, lastName: 1 });
  query.exec(function(err, employees) {
    if (err) {
      console.log(err);
      res.status(500).send('Server error on finding movie details.');
    } else if (employees === null) {
      res.status(404).send(`No employee found by the query.`);
    } else {
      const employeesExt = employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        photo: `${req.protocol}://${req.get('host')}/api/employee/photo/${employee.id}`,
      }));
      res.send(employeesExt);
    }
  });
};

exports.findEmployeesByName = (req, res) => {
  const query = Employee.find({});
  if (typeof req.params.query === 'string') {
    query.or([
      { firstName: { $regex: req.params.query, $options: 'i' } },
      { lastName: { $regex: req.params.query, $options: 'i' } },
    ]);
  }
  query.select('id firstName lastName email');
  query.sort({ firstName: 1, lastName: 1 });
  query.exec(function(err, employees) {
    if (err) {
      console.log(err);
      res.status(500).send('Server error on finding movie details.');
    } else if (employees === null) {
      res.status(404).send(`No employee found by the query.`);
    } else {
      const employeesExt = employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        photo: `${req.protocol}://${req.get('host')}/api/employee/photo/${employee.id}`,
      }));
      res.send(employeesExt);
    }
  });
};

exports.getEmployeeDetail = (req, res) => {
  Employee.findById(req.params.id, function(err, employee) {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400).send('Bad request. Employee ID is incorrect.');
      } else {
        res.status(500).send('Server error on finding employee photo.');
      }
    } else if (employee === null) {
      res.status(404).send(`No employee found by id = ${req.params.id}.`);
    } else {
      res.send({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        photo: `${req.protocol}://${req.get('host')}/api/employee/photo/${employee.id}`,
      });
    }
  });
};

exports.getEmployeePhoto = (req, res) => {
  Employee.findById(req.params.id, function(err, employee) {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400).send('Bad request. Employee ID is incorrect.');
      } else {
        res.status(500).send('Server error on finding employee photo.');
      }
    } else if (employee === null) {
      res.status(404).send(`No employee found by id = ${req.params.id}.`);
    } else {
      res.header("Content-Type", "image/jpeg");
      res.header("Content-Length", employee.photo.length);
      res.send(employee.photo);
    }
  });
};

// const fs = require('fs');
// exports.employeesBootstrap = (req, res) => {
//   [
//     'Torben Majgaard',
//     'Andrey Kolodyuk',
//     'Helis Zulijani-Boye',
//     'Alex Fridlyand',
//     'Sam Kingston',
//     'James Donaldson',
//     'Anna Goryachkina',
//     'Christian Aaen',
//     'Marina Vyshegorodskikh',
//     'Anna Ryzhova',
//     'Andriy Oksenyuk',
//     'Olga Kuraksa',
//   ].forEach(name => {
//     fs.readFile(`./${name.replace(' ', '_').toLowerCase()}.jpg`, 'binary', function(err, original_data) {
//       if (err) {
//         console.log('ERROR:');
//         console.log(err);
//       } else {
//         const photo = new Buffer(original_data, 'binary');
//         const employee = new Employee({
//           name: name,
//           email: `${name.replace(' ', '.').toLowerCase()}@ciklum.com`,
//           photo,
//         });
//         employee.save((err) => {
//           if(err) {
//             console.log(err);
//           }
//         });
//         console.log(`${employee.name} added.`);
//       }
//     });
//   });
//   res.status(200).send('Done.');
// };
