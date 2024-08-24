const otpError = require("./otpError");
const otpModel = require("./otpModel");
const axios = require("axios");
const { findUserByEmail } = require("../user/services");

const otpFinderByUserId = async (userId) => {
  return await otpModel.findOne({ userId: userId });
};

const updateIsUsedToTrue = async (otpId) => {
  await otpModel.findOneAndUpdate({ _id: otpId }, { $set: { isUsed: true } });
};

const decrementLife = async (otpId, lifeNum) => {
  await otpModel.findOneAndUpdate({ _id: otpId }, { $set: { life: lifeNum } });
};

const saveOTP = async (myOTP, userId) => {
  const currentTime = new Date();

  await otpModel({
    userId: userId,
    otpCode: myOTP,
    expirationTime: new Date(currentTime.getTime() + 5 * 60000),
    life: 5,
    isUsed: false,
  }).save();
};

const sendOTP = async (email, myOTP) => {
  const data = new URLSearchParams({
    apikey:
      "4D248F86759751CE0D227B29BA732E077E0978E80184E9385E83650C93E8AAC51987988B56062CCED504B757AEBB9185",
    subject: "your OTP code",
    from: "charbelak311@gmail.com",
    to: email,
    bodyHtml: `your OTP code is :  ${myOTP}`,
    isTransactional: "true",
  });

  return await axios.post("https://api.elasticemail.com/v2/email/send", data);
};

const OTPsaver = async (myOTP, email) => {
  let userFinder = await findUserByEmail(email);

  if (userFinder) {
    const currentTime = new Date();
    const otpFinder = await otpFinderByUserId(userFinder._id);

    if (otpFinder) {
      if (
        otpFinder.expirationTime > currentTime &&
        !otpFinder.isUsed &&
        otpFinder.life > 0
      ) {
        const error = new Error(otpError.otpAlreadyExist.message);
        error.statusCode = otpError.otpAlreadyExist.statusCode;
        throw error;
      } else {
        await otpModel.deleteOne({ _id: otpFinder._id });
        await saveOTP(myOTP, userFinder._id);
      }
    } else {
      await saveOTP(myOTP, userFinder._id);
    }
  } else {
    const error = new Error(otpError.userNotFound.message);
    error.statusCode = otpError.userNotFound.statusCode;
    throw error;
  }
};

module.exports = {
  sendOTP,
  OTPsaver,
  otpFinderByUserId,
  updateIsUsedToTrue,
  decrementLife,
};
