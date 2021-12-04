const db = require("../models");
const employee = db.employees;

exports.findAll = (req, res) => {
  employee
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.create = (req, res) => {
  const employeepost = new employee({
    employee_email: req.body.employee_email,
    employee_username: req.body.employee_username,
    employee_nama: req.body.employee_nama,
    employee_pwd: req.body.employee_pwd,
    employee_foto: req.body.employee_foto,
    employee_isactive: req.body.employee_isactive
      ? req.body.employee_isactive
      : false,
  });

  employeepost
    .save(employeepost)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  employee
    .findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  employee
    .findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Not Found",
        });
      }
      res.send({
        message: "updated",
      });
    })

    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  employee
    .findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Not Found",
        });
      }
      res.send({
        message: "Deleted",
      });
    })

    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};
