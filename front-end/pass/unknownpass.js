import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("unknownpassForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
    };
 
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/forgetpassword"
      );
      
  
      if (response.status == 400) {
        console.log(response.data.message);
      } else {
       
        console.log( response);
        sessionStorage.setItem("email", formData.get("email"));
       console.log(formData.get("email"));
         window.location.href = "/front-end/pass/verification.html"; 
      }
    } catch (error) {
      console.error("Error:", error);
    }

   
 
  });
