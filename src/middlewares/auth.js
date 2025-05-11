// this middleware is used to check if the user is an admin
const admin_auth = (req, res, next) => {
  const admintoken = "xyz";
  const authorization_token = "xyz";
  if (admintoken !== authorization_token) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const user_auth = (req, res, next) => {
  const usertoken = "xyz";
  const authorization_token = "xyz";
  if (usertoken !== authorization_token) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

module.exports = {
  admin_auth,
  user_auth,
};
