import { forwardRequest } from "../util/requestSender.js";

let useremail = sessionStorage.getItem("email");
console.log(useremail);

document
  .getElementById("verifyform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      otp: formData.get("otp"),
      email: useremail,
    };

    //
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/otp/verifyotp"
      );

      if (response.message == "OTP match") {
        //sessionStorage.setItem("email", useremail);
        window.location.href = "/front-end/pass/newpass.html";
      } else {
        // todo show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
