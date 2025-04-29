// public/callrestapi.js

const API_URL = '/api/users';
let usersData = [];

// Muestra un alert Bootstrap con un mensaje
function showMessage(message, type = 'success') {
  document.getElementById('resultMessage').innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}

// Limpia el formulario y restablece modo "crear"
function clearForm() {
  document.getElementById('userForm').reset();
  document.getElementById('userId').value = '';
  document.getElementById('saveBtn').textContent = 'Enviar';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

// Rellena la tabla con la lista de usuarios y botones de acción
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
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editUser(${user.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Borrar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// GET /api/users
async function getUsers() {
  try {
    const res = await fetch(API_URL);
    const { users } = await res.json();
    usersData = users;
    renderTable(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    showMessage('Error al cargar usuarios', 'danger');
  }
}

// POST /api/users
async function postUser() {
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
    if (!res.ok) throw new Error(res.statusText);
    showMessage('Usuario creado con éxito');
    clearForm();
    getUsers();
  } catch (err) {
    console.error('Error creating user:', err);
    showMessage('Error al crear usuario', 'danger');
  }
}

// PUT /api/users/:id
async function updateUser(id) {
  const name     = document.getElementById('name').value;
  const email    = document.getElementById('email').value;
  const age      = parseInt(document.getElementById('age').value, 10) || 0;
  const comments = document.getElementById('comments').value;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age, comments })
    });
    if (!res.ok) throw new Error(res.statusText);
    showMessage('Usuario actualizado con éxito');
    clearForm();
    getUsers();
  } catch (err) {
    console.error('Error updating user:', err);
    showMessage('Error al actualizar usuario', 'danger');
  }
}

// DELETE /api/users/:id
async function deleteUser(id) {
  if (!confirm('¿Eliminar usuario?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.status !== 204) throw new Error(res.statusText);
    showMessage('Usuario eliminado', 'warning');
    getUsers();
  } catch (err) {
    console.error('Error deleting user:', err);
    showMessage('Error al borrar usuario', 'danger');
  }
}

// Carga datos en formulario para editar
function editUser(id) {
  const user = usersData.find(u => u.id === id);
  if (!user) return;
  document.getElementById('userId').value     = user.id;
  document.getElementById('name').value       = user.name;
  document.getElementById('email').value      = user.email;
  document.getElementById('age').value        = user.age;
  document.getElementById('comments').value   = user.comments;
  document.getElementById('saveBtn').textContent      = 'Actualizar';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

// Maneja el submit del formulario según modo (crear o editar)
async function saveUser(event) {
  event.preventDefault();
  const id = document.getElementById('userId').value;
  if (id) {
    await updateUser(id);
  } else {
    await postUser();
  }
}

// Asigna eventos al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('userForm').addEventListener('submit', saveUser);
  document.getElementById('loadUsersBtn').addEventListener('click', getUsers);
  document.getElementById('cancelEditBtn').addEventListener('click', clearForm);
  getUsers();
});

