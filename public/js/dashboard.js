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
        alert("Post Added!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  }
};

//---------- Create New Post ----------//
  // form.addEventListener("submit", async (event) => {
  //   event.preventDefault();
  //   const name = document.querySelector("#blog-name").value.trim();
  //   const description = document.querySelector("#blog-desc-input").value.trim();

  //   if (name && description) {
  //     const response = await fetch(`/api/posts`, {
  //       method: "POST",
  //       body: JSON.stringify({ name, description }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       document.location.replace("/dashboard");
  //     } else {
  //       alert("Failed to create post");
  //     }
  //   }
  // });

//---------- Delete Post ----------//
// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to delete project");
//     }
//   }
// };

// document.querySelector("#new-post-button").addEventListener("click", genForm);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", createNewPost);