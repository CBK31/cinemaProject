let blurrDiv = document.createElement("div");
blurrDiv.classList.add("blurrDiv");

let bodyy = document.getElementsByTagName("body");
bodyy.appendChild(blurrDiv);



document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    /*   console.log(`
    ${formData.get("email")}
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ${formData.get("firstName")}
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ${formData.get("lastName")}
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ${formData.get("password")}
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ${formData.get("phoneNumber")}
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ${formData.get("dob")}
    
    
    `);*/
    const data = {
      email: formData.get("firstName"),
      firstName: formData.get("lastName"),
      lastName: formData.get("email"),
      password: formData.get("phoneNumber"),
      phoneNumber: formData.get("password"),
      dob: formData.get("dob"),
    };

    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/user/signup`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  });
