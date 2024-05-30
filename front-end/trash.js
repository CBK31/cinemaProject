const forwardRequest = async () => {
  const response = await axios({
    method: "GET",
    url: `http://localhost:3000/user/signup`,
    data: {
      email: "charbelak31@gmail.com",
      firstName: "charbel",
      lastName: "abi khalil",
      password: "This is my pass 00",
      phoneNumber: 38748979,
      dob: "4/2/1990",
    },
    headers: {
      "Content-Type": "application/json",
      // Authorization: req.headers["authorization"],
    },
  });
};
const result = forwardRequest();
console.log(result);
