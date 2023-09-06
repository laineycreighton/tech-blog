const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const postId = window.location.pathname.split('/').pop();
  const text = commentText.value.trim();

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
});
