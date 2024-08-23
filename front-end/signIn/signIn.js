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

     let datamssg =document.getElementById('mssg');
      if (response.status == 400) {
        datamssg.textContent =response.data.message;
        //  todo error div
       /*  window.location.href = "signIn.html"; */
      }
      else {
      console.log(`user id : ${response._id}`); // to read
      console.log("Success:", response); 
/*       console.log(response.data.message);
      datamssg.textContent =response.data.message; */
      sessionStorage.setItem('movieName', 'Inception');
      window.location.href = "../homePage/index.html";
    }
    } catch (error) {
      console.error("Error:", error);
    }
  });
