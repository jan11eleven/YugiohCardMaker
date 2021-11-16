const express = require("express");
const routes = express.Router();
const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//@routes POST /signup - create user
routes.post("/signup", async (req, res) => {
  try {
    let signupError = undefined;
    const resUsername = await UsersModel.find({
      Username: req.body.Username,
    });

    const resEmail = await UsersModel.find({
      Email: req.body.Email,
    });
    if (resUsername.length !== 0) {
      signupError = "Username is already taken!";
      return res.send({
        newUser: {
          Email: undefined,
          Username: undefined,
          Password: undefined,
        },
        signupError,
      });
    } else if (resEmail.length !== 0) {
      signupError = "The email you provided had already been used!";
      return res.send({
        newUser: {
          Email: undefined,
          Username: undefined,
          Password: undefined,
        },
        signupError,
      });
    } else if (req.body.Username.length < 8 || req.body.Username.length > 16) {
      signupError =
        "Username must be minimum of 8 and maximum of 16 characters";
      return res.send({
        newUser: {
          Email: undefined,
          Username: undefined,
          Password: undefined,
        },
        signupError,
      });
    } else if (req.body.Password.length < 8 || req.body.Password.length > 16) {
      signupError =
        "Password must be minimum of 8 and maximum of 16 characters";
      return res.send({
        newUser: {
          Email: undefined,
          Username: undefined,
          Password: undefined,
        },
        signupError,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const newUser = new UsersModel({
        Email: req.body.Email,
        Username: req.body.Username,
        Password: hashedPassword,
      });

      const result = await newUser.save();

      res.send({ newUser: result, signupError }).status(201);
    }
  } catch (err) {
    res.send({ message: err });
  }
});
// login user
routes.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    failureRedirect: "/api/users/login/failed",
    successRedirect: "/api/users/login/success",
  })
);

routes.get("/login/success", checkNotAuthenticated, (req, res) => {
  res.send({
    loginState: { isAuth: true, loginError: "", redirect: undefined },
    credentials: { username: req.user.Username, password: req.user.Password },
  });
});

routes.get("/login/failed", (req, res) => {
  res.send({
    loginState: {
      isAuth: false,
      loginError: "Username and Password is incorrect.",
      redirect: undefined,
    },
    credentials: { username: undefined, password: undefined },
  });
});

routes.delete("/logout", (req, res) => {
  req.logOut();
  res.send({
    loginState: { isAuth: false, loginError: "", redirect: undefined },
    credentials: { username: undefined, password: undefined },
  });
});

// auth user
routes.post(
  "/authenticate",
  checkNotAuthenticated,
  passport.authenticate("local", {
    failureRedirect: "/api/users/authenticate/failed",
    successRedirect: "/api/users/authenticate/success",
  })
);

routes.get("/authenticate/success", (req, res) => {
  res.send({
    loginState: { isAuth: true, loginError: "", redirect: undefined },
    credentials: { username: req.user.Username, password: req.user.Password },
  });
});

routes.get("/authenticate/failed", (req, res) => {
  res.send({
    loginState: {
      isAuth: false,
      loginError: "",
      redirect: undefined,
    },
    credentials: { username: undefined, password: undefined },
  });
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.send({
      loginState: { isAuth: true, loginError: "", redirect: "/" },
      credentials: { username: req.user.Username, password: req.user.Password },
    });
  }
  next();
}

module.exports = routes;
