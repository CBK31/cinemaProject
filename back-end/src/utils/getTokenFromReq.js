const getTokenFromReq = async (req) => {
  try {
    return req.body.token;
  } catch (error) {
    return undefined;
  }
};
module.exports = getTokenFromReq;
