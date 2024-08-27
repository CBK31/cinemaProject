import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); 

    
    const formData = new FormData(event.target);

    
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
      dob: formData.get("dob"),
    };

    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/signUp"
      );

      let datamssg = document.getElementById("mssg");
      if (response.status == 400) {
        datamssg.textContent = response.data.message;
      } else {
         window.location.href = "../signIn/signIn.html"; 
      }
    } catch (error) {
      console.error("Error:", error); 
    }
  });
