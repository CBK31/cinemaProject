import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("entering my signup.js file");

    const formData = new FormData(event.target);

    const data = {
      firstName:   "dfgd",
      lastName:    "dfgd",
      email:       "dfgd",
      phoneNumber: 66788,
      password:    "dfgd",
      dob:         "dfgd",
    };

    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/signUp"
      );
      if(response.status == 400){
        alert(response.data.message);
      }
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  });