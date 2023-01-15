const createNewPost = async (event) => {
    event.preventDefault();

console.log(event.target[1].dataset);

    const title = document.querySelector('#user-title').value.trim();
    const content = document.querySelector('#user-content').value.trim();

console.log(title);

    // if (title & content) {
    if (title && content) {
      const response = await fetch(`/api/users/dashboard/newpost`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to save new post.');
      }
    } 
  };

  document
  .querySelector('.newPost-form')
  .addEventListener('submit', createNewPost);