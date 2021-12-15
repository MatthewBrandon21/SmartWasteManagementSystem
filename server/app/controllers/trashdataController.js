const db = require("../models");
const trashdata = db.trashdatas;
const verify = require("../routes/verifyToken");

exports.findAll = (req, res) => {
  trashdata
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
  const trashpost = new trashdata({
    tempat_sampah_jenis: req.body.tempat_sampah_jenis,
    tempat_sampah_name: req.body.tempat_sampah_name,
    tempat_sampah_location: req.body.tempat_sampah_location,
    tempat_sampah_region: req.body.tempat_sampah_region,
    tempat_sampah_maxcapacity: req.body.tempat_sampah_maxcapacity,
    tempat_sampah_totalcapacitythismonth: req.body.tempat_sampah_totalcapacitythismonth,
    tempat_sampah_current: {
      tempat_sampah_gpslocation: {
        lon: req.body.tempat_sampah_current.tempat_sampah_gpslocation.lon,
        lat: req.body.tempat_sampah_current.tempat_sampah_gpslocation.lat
      },
      tempat_sampah_currentcapacity: req.body.tempat_sampah_current.tempat_sampah_currentcapacity,
      tempat_sampah_currentlevel: req.body.tempat_sampah_current.tempat_sampah_currentlevel
    },
    tempat_sampah_isfull: req.body.tempat_sampah_isfull
      ? req.body.tempat_sampah_isfull
      : false
  });

  trashpost
    .save(trashpost)
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

  trashdata
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

  trashdata
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

  trashdata
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
