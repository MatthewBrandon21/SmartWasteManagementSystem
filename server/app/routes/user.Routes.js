const Joi = require("@hapi/joi");

module.exports = (app) => {
  const users = require("../controllers/userController");
  const router = require("express").Router();
  const db = require("../models");
  const user = db.users;
  const {
    userregistervalidation,
    userloginvalidation,
  } = require("../../validation");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const verify = require("./verifyToken");

  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  // router.delete("/:id", verify.isAuth, verify.isAdmin, users.delete);

  router.post("/register", async (req, res) => {
    //validate 1st
    const { error } = userregistervalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if exist
    const emailexist = await user.findOne({
      user_email: req.body.user_email,
    });

    if (emailexist) return res.status(400).send("Email already exist");

    //passwd hash
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.user_pwd, salt);

    //create user
    const userpost = new user({
      user_email: req.body.user_email,
      user_username: req.body.user_username,
      user_nama: req.body.user_nama,
      user_address: req.body.user_address,
      user_phonenum: req.body.user_phonenum,
      user_pwd: hashpwd,
      user_isAdmin: req.body.user_isAdmin,
    });

    try {
      const saveduser = await userpost.save();
      res.send(saveduser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/login", async (req, res) => {
    //validate 1st
    const { error } = userloginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if exist
    const userexist = await user.findOne({
      user_email: req.body.user_email,
    });

    if (!userexist) return res.status(400).send("Email doesnt exist");

    //pass is correct
    const validpwd = await bcrypt.compare(
      req.body.user_pwd,
      userexist.user_pwd
    );
    if (!validpwd) return res.status(400).send("Invalid Password");

    const token = jwt.sign(
      {
        id: userexist.id,
        user_isAdmin: userexist.isAdmin,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.header("auth-token", token).send(token);
  });

  app.use("/user", router);
};
