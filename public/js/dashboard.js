//---------- Create New Post ----------//
const createNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name-input").value.trim();
  const body = document.querySelector("#post-body-input").value.trim();

  if (title && body) {
    try {
      console.log(title + " " + body);
      // send a POST req to the api endpoint
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("New Post:");
        console.log(title + " " + body);
        document.location.replace("/dashboard");
        alert(response.statusText);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  }
};

//---------- Create New Post ----------//
const genForm = async (event) => {
  event.preventDefault();

  const formContainer = document.querySelector("#form-container");

  // create form element
  const form = document.createElement("form");
  form.id = "blog-form";
  formContainer.appendChild(form);

  // create input for blog name
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Blog Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "blog-name";
  nameInput.required = true;
  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  // create input for blog description
  const descLabel = document.createElement("label");
  descLabel.textContent = "Blog Description:";
  const descInput = document.createElement("textarea");
  descInput.id = "blog-desc-input";
  descInput.required = true;
  form.appendChild(descLabel);
  form.appendChild(descInput);

  // create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Blog";
  form.appendChild(submitButton);

  // add event listener to prevent default form submission

  // document.querySelector("#new-post-button").addEventListener("click", genForm);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#blog-name").value.trim();
    const description = document.querySelector("#blog-desc-input").value.trim();

    if (name && description) {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      }
    }
  });
};

//---------- Delete Post ----------//
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

// document.querySelector("#new-post-button").addEventListener("click", genForm);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", createNewPost);