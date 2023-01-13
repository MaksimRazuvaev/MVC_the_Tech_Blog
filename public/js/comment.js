const submitCommentFormHandler = async (event) => {
    event.preventDefault();

console.log(event.target[1].dataset);

    const comment = document.querySelector('#user-comment').value.trim();
    const postId = event.target[1].dataset.postId;

    // if (comment) {
    if (comment) {
      const response = await fetch(`/api/users/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to save comment.');
      }
    } 
  };

  document
  .querySelector('.comment-form')
  .addEventListener('submit', submitCommentFormHandler);