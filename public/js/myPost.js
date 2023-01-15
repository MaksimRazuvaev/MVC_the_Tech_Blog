const updateMyPost = async (event) => {
    event.preventDefault();

console.log(event.target[1].dataset);

    const title = document.querySelector('#user-title').value.trim();
    const content = document.querySelector('#user-content').value.trim();

    // if (title & content) {
    if (title && content) {
      const response = await fetch(`/api/users/dashboard/newpost/:id`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to update post.');
      }
    } 
  };

const deleteMyPost = async (event) => {
    event.preventDefault();

  const idDelete = document.location.pathname.split("/")[3];

console.log(idDelete);

    if (idDelete) {
        const response = await fetch(`/api/users/dashboard/newpost/${idDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to delete.');
        }
    } 
};


  document
  .querySelector('.newPost-form')
  .addEventListener('submit', updateMyPost);

  document
  .querySelector('.deletePost-form')
  .addEventListener('submit', deleteMyPost);