import { forwardRequest } from "../util/requestSender.js";

let useremail = sessionStorage.getItem('email');
console.log(email);

document
  .getElementById("verifyform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      otp : formData.get("otp"),
      email : useremail,

    };
 

//  
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/otp/verifyotp"
      );
      
      let datamssg = document.getElementById("mssg");
      datamssg.textContent = "Your OTP is valid for 5 minutes";

      if (response.status == 400) {

        console.log(response.data.message);

      } else {
       
        console.log( response);
      
         window.location.href = "/front-end/pass/newpass.html"; 
      }
    } catch (error) {
      console.error("Error:", error);
    }

   
 
  });
