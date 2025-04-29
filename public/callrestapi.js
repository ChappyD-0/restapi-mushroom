// frontend/callrestapi.js

const API_URL = '/api/users';

// Muestra un alert Bootstrap con un mensaje
function showMessage(message, type = 'success') {
  document.getElementById('resultMessage').innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}

// Rellena la tabla con la lista de usuarios
function renderTable(users) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.comments}</td>
      <td>${new Date(user.createdAt).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// GET /api/users
async function getUsers() {
  try {
    const res = await fetch(API_URL);
    const { users } = await res.json();
    renderTable(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    showMessage('Error al cargar usuarios', 'danger');
  }
}

// POST /api/users
async function postUser(event) {
  event.preventDefault();
  const name     = document.getElementById('name').value;
  const email    = document.getElementById('email').value;
  const age      = parseInt(document.getElementById('age').value, 10) || 0;
  const comments = document.getElementById('comments').value;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age, comments })
    });
    const { user } = await res.json();
    showMessage('Usuario creado con éxito');
    document.getElementById('userForm').reset();
    getUsers();
  } catch (err) {
    console.error('Error creating user:', err);
    showMessage('Error al crear usuario', 'danger');
  }
}

// Asigna eventos al cargar la página
document.getElementById('userForm').addEventListener('submit', postUser);
document.getElementById('loadUsersBtn').addEventListener('click', getUsers);

// Carga la tabla en el arranque
getUsers();

