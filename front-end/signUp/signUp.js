document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(`
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
    
    
    `);
    const data = {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      password: formData.get("password"),
      phoneNumber: formData.get("phoneNumber"),
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
