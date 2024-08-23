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

      let datamssg = document.getElementById("mssg");
      if (response.status == 400) {
        datamssg.textContent = response.data.message;
      } else {
        sessionStorage.setItem("token", response.token);
        console.log("////////////////////////////////////////////");
        console.log( response.token);
        console.log("////////////////////////////////////////////");
         window.location.href = "../homePage/index.html"; 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
