import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("signInForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/login"
      );

      if (response.status == 400) {
        alert(response.data.message); //  todo error div
      }
      // todo 200 successful go to index page
      console.log(`user id : ${response._id}`); // to read
      console.log("responce from the back-end : ", response);
    } catch (error) {
      console.error("Error:", error);
    }
  });
