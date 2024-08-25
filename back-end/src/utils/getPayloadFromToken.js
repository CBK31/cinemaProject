const { verify } = require("jsonwebtoken");

const getPayloadFromToken = async (token) => {
  try {
    return verify(token, "a_secret_key");
  } catch (error) {
    return undefined;
  }
};
module.exports = getPayloadFromToken;
