const Joi = require("@hapi/joi");

module.exports = (app) => {
  const admins = require("../controllers/adminController");
  const router = require("express").Router();
  const db = require("../models");
  const admin = db.admins;
  const {
    adminregistervalidation,
    adminloginvalidation,
  } = require("../../validation");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const verify = require("../routes/verifyToken");

  router.get("/", admins.findAll);
  // router.post('/', admins.create);
  router.get("/:id", admins.findOne);
  router.put("/:id", admins.update);
  router.delete("/:id", admins.delete);

  router.post("/register", async (req, res) => {
    //validate 1st
    const { error } = adminregistervalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if exist
    const emailexist = await admin.findOne({
      admin_email: req.body.admin_email,
    });

    if (emailexist) return res.status(400).send("Email already exist");

    //passwd hash
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.admin_pwd, salt);

    //create user
    const adminpost = new admin({
      admin_email: req.body.admin_email,
      admin_username: req.body.admin_username,
      admin_nama: req.body.admin_nama,
      admin_pwd: hashpwd,
      admin_isactive: req.body.admin_isactive ? req.body.admin_isactive : false,
    });

    try {
      const savedadmin = await adminpost.save();
      res.send(savedadmin);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/login", async (req, res) => {
    //validate 1st
    const { error } = adminloginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if exist
    const useradmin = await admin.findOne({
      admin_email: req.body.admin_email,
    });

    if (!useradmin) return res.status(400).send("Email doesnt exist");

    //pass is correct
    const validpwd = await bcrypt.compare(
      req.body.admin_pwd,
      useradmin.admin_pwd
    );
    if (!validpwd) return res.status(400).send("Invalid Password");

    const token = jwt.sign(
      {
        id: useradmin.id,
        isAdmin: useradmin.isAdmin,
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send(token);

    res.send("Logged In");
  });

  app.use("/admin", router);
};
