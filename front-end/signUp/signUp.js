import { forwardRequest } from "../util/requestSender.js";

document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Create a FormData object from the form element
    const formData = new FormData(event.target);

    // Construct the data object using formData entries
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

      if (response.status == 400) {
        alert(response.data.message); //  client-side error
        if(){
        }
      }
      console.log("Success:", response); // Log the successful response
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  });
