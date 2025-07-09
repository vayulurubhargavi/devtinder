const validator = require("validator");
// validate the userdata when user signs up
const validateUserSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid !!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid..");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong!!");
  }
};

const validateEditProfileData=(req)=>{
  const allowedFields=["age","gender","photourl","skills","email"];
  const isEditableField = Object.keys(req.body).every(field =>allowedFields.includes(field));
  return isEditableField;
}

module.exports = {
  validateUserSignUpData,
  validateEditProfileData
};
