const axios = require("axios");

const forwardRequest = async (body, requestMethod, serviceUrl) => {
  try {
    // const response = await axios({
    //   method: requestMethod,
    //   url: `${serviceUrl}`,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   timeout: 5000,
    // });
    fetch("http://localhost:3000/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        status: 500,
        data: {
          message: "Internal Server Error - Unable to contact the service",
        },
      };
    }
  }
};

module.exports = forwardRequest;
// http://localhost:3000/...
