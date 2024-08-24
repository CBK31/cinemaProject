import { forwardRequest } from "../util/requestSender.js";
let useremail = sessionStorage.getItem('email');
document
  .getElementById("passForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
    };
 

//  
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
      
         window.location.href = "/front-end/pass/verification.html"; 
      }
    } catch (error) {
      console.error("Error:", error);
    }

   
 
  });
