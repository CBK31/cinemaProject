import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("unknownpassForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("Email"),
    };
 window.location.href = "./newpass.html"; 

//    window.location.href = "/front-end/pass/newpass.html";
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/forgetpassword"
      );
       
    } catch (error) {
      console.error("Error:", error);
    }
   if (Response.status == 200) {
 window.location.href = "./newpass.html"; 
    
   }
 
  });
