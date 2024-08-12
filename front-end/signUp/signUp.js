console.log("loadeddddddddd");
const  forwardRequest =require("../util/requestSender.js");

let blurrDiv = document.createElement("div");
blurrDiv.classList.add("blurrDiv");

let bodyy = document.getElementsByTagName("body");
//bodyy.appendChild(blurrDiv);
bodyy[0].appendChild(blurrDiv);
//const forwardRequest = async (body, requestMethod, serviceUrl)

document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("entering my signup.js fiilleee");

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
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  });

    /* const ddata = {
      email: "charladdk31@gmail.com",
      firstName: "charbel",
      lastName: "abi khalil",
      password: "This is my pass 00",
      phoneNumber: 38748979,
      dob: "4/2/1990",
    }; */

     
   


    //   try {
    //     const response = await axios({
    //       method: "POST",
    //       url: `http://localhost:3000/user/signup`,
    //       data: data,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     console.log("Response:", response);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
 
