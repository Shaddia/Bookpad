document.getElementById('registerForm').addEventListener('submit', async (e) => {
  console.log("Intentando1")
  e.preventDefault();
  console.log("Intentando1")
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    console.log("Intentando1")
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    console.log("Intentandoq")
    const data = await response.json();
    console.log(data)
    document.getElementById('responseMessage').textContent = data.msg;

  } catch (error) {
    console.error('Error:', error);
  }
});
