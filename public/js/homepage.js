// event listener to add comments

const addComment = async (event) => {
  event.preventDefault();

  const text = document.getElementById('new-comment');

  if (text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text, post_id: postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector(".add-new-comment")
  .addEventListener("submit", addComment);