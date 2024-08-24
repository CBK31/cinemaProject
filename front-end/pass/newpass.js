import { forwardRequest } from "../util/requestSender.js";

let useremail = sessionStorage.getItem('email');
console.log(useremail);

document
  .getElementById("passForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
       email: sessionStorage.getItem('email') ,
       newPassword : formData.get("pass"),
       confirmPassword :formData.get("newpass"),
 
    };
 console.log(formData.get("pass") + " " + formData.get("newpass"));
 


    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/resetpassword"
      );

       let datamssg =  document.getElementById("mssg");
  
      if (response.status == 400) {

      datamssg= response.data.message;

      } else {
        datamssg= response.data.message;

        console.log(response);
      
         window.location.href = "/front-end/homePage/index.html"; 
      }
    } catch (error) {
      console.error("Error:", error);
    }

   
 
  });
