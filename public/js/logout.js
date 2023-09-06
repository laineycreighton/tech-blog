const logoutButton = document.getElementById('logout');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Redirect the user to the homepage or login page
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
