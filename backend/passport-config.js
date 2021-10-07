const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UsersModel = require("./models/user");

function initializePassport(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await UsersModel.findOne(
        { Username: username },
        { useFindAndModify: false }
      );
      if (!user) {
        return done(null, false);
      }
      if (await bcrypt.compare(password, user.Password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "Username", passwordField: "Password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    UsersModel.findOne({ _id: id }).then((user) => {
      done(null, user);
    });
  });
}

module.exports = initializePassport;
