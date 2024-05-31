module.exports = {
  userExist: {
    message: "user is already signed up",
    statusCode: 400,
  },
  signUpError: {
    message: "An error occured during the sign up process",
    statusCode: 400,
  },
  userNotFound: {
    message: "incorrect email or user not signed up ",
    statusCode: 400,
  },
  incorrectPass: {
    message: "incorrect password ",
    statusCode: 400,
  },
  sendingOTP: {
    message: "An error occured while sending OTP",
    statusCode: 400,
  },
};
