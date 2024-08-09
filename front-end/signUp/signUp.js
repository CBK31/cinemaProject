const { forwardRequest } = require("../util/requestSender");

let blurrDiv = document.createElement("div");
blurrDiv.classList.add("blurrDiv");

let bodyy = document.getElementsByTagName("body");
bodyy.appendChild(blurrDiv);

//const forwardRequest = async (body, requestMethod, serviceUrl)

await document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("entering my signup.js fiilleee");
    // const formData = new FormData(event.target);

    // const data = {
    //   email: formData.get("firstName"),
    //   firstName: formData.get("lastName"),
    //   lastName: formData.get("email"),
    //   password: formData.get("phoneNumber"),
    //   phoneNumber: formData.get("password"),
    //   dob: formData.get("dob"),
    // };
    const ddata = {
      email: "charladdk31@gmail.com",
      firstName: "charbel",
      lastName: "abi khalil",
      password: "This is my pass 00",
      phoneNumber: 38748979,
      dob: "4/2/1990",
    };
    const a = await forwardRequest(
      ddata,
      "POST",
      "http://localhost:3000/user/signUp"
    );
    alert(a);
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
  });
