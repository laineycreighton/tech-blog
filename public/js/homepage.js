//---------- Create New Comment ----------//
const addComment = async (event) => {
  event.preventDefault();

  const text = document.getElementById('new-comment').value.trim();

  if (text) {
    try {
      console.log(text);
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("New Comment:");
        console.log(text);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".add-new-comment")
  .addEventListener("submit", addComment);

