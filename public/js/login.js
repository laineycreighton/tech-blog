const loginFormHandler = async (event) => {
  event.preventDefault();

  // Query Selectors
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log("Username", username);
  console.log("Password:", password);

  if (username && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // redirect after signing in
        document.location.replace("/homepage");
        console.log("Routing to Homepage!");
      } else {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while logging in. Please try again.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log(event);

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();


  if (username && password) {
    try {
      // send a POST req to the api endpoint
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });


      if (response.ok) {
        // redirect after signing up
        document.location.replace("/homepage");
        alert(response.statusText);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while signing up. Please try again.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
