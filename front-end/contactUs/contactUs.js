import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("submitcontact")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    const data = {
      firstName: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("textarea"),

    }
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/contact"  
      );
      
      let datamssg = document.getElementById("mssg");
      if (response.status == 400) { 
        
      datamssg.textContent = "error message not Sent!";
        
      }else {
               datamssg.textContent = "Message  Sent!";
         location.reload();
 
      }

    } catch (error) {
      console.error("Error:", error); 
    }
  });
