// callrestapi.js - Versión Corregida
const API_URL = 'http://35.243.205.220/api/users';
let usersData = [];

// ====================== [FUNCIONES DE INTERFAZ] ======================
const showMessage = (message, type = 'success') => {
  const messageContainer = document.getElementById('resultMessage');
  messageContainer.innerHTML = `
    <div class="alert ${type}">
      ${message}
      <button onclick="this.parentElement.remove()" class="close-btn">&times;</button>
    </div>
  `;
  setTimeout(() => messageContainer.innerHTML = '', 5000);
};

const clearForm = () => {
  document.getElementById('userForm').reset();
  document.getElementById('userId').value = '';
  document.getElementById('saveBtn').textContent = 'Guardar';
  document.getElementById('cancelEditBtn').style.display = 'none';
};

const renderTable = (users) => {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = users.map(user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.comments || '-'}</td>
      <td>${new Date(user.createdAt).toLocaleString()}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${user.id})">Editar</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Borrar</button>
      </td>
    </tr>
  `).join('');
};

// ====================== [FUNCIONES CRUD] ======================
window.getUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const { users } = await response.json();
    usersData = users;
    renderTable(users);
  } catch (error) {
    showMessage(`Error cargando usuarios: ${error.message}`, 'error');
  }
};

window.postUser = async () => {
  const getValue = id => document.getElementById(id).value.trim();
  
  const userData = {
    name: getValue('name'),
    email: getValue('email'),
    age: parseInt(getValue('age')) || 0,
    comments: getValue('comments')
  };

  if (!userData.name || !userData.email) {
    return showMessage('Nombre y email son requeridos', 'error');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error desconocido');

    showMessage(`Usuario ${data.user.name} creado!`);
    await getUsers();
    clearForm();
  } catch (error) {
    showMessage(`Error creando usuario: ${error.message}`, 'error');
  }
};

window.updateUser = async (id) => {
  const userData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    age: parseInt(document.getElementById('age').value) || 0,
    comments: document.getElementById('comments').value.trim()
  };

  if (!userData.name || !userData.email) {
    return showMessage('Nombre y email son requeridos', 'error');
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error desconocido');

    showMessage(`Usuario ${data.user.name} actualizado!`);
    await getUsers();
    clearForm();
  } catch (error) {
    showMessage(`Error actualizando: ${error.message}`, 'error');
    console.error('Detalle error:', error);
  }
};

window.deleteUser = async (id) => {
  if (!confirm(`¿Eliminar usuario ${id}? Esta acción es irreversible`)) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE' 
    });

    if (response.status === 204) {
      showMessage('Usuario eliminado', 'warning');
      await getUsers();
      return;
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error eliminando');

    showMessage(data.message || 'Usuario eliminado');
    await getUsers();
  } catch (error) {
    showMessage(`Error eliminando: ${error.message}`, 'error');
  }
};

// ====================== [FUNCIONES ADICIONALES] ======================
window.editUser = (id) => {
  const user = usersData.find(u => u.id === id);
  if (!user) return showMessage('Usuario no encontrado', 'error');

  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('age').value = user.age;
  document.getElementById('comments').value = user.comments || '';

  document.getElementById('saveBtn').textContent = 'Actualizar';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
};

window.saveUser = async (e) => {
  e.preventDefault();
  try {
    const id = document.getElementById('userId').value;
    id ? await window.updateUser(id) : await window.postUser();
  } catch (error) {
    showMessage(`Error procesando formulario: ${error.message}`, 'error');
  }
};

// ====================== [INICIALIZACIÓN] ======================
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('userForm').addEventListener('submit', window.saveUser);
  document.getElementById('loadUsersBtn').addEventListener('click', window.getUsers);
  document.getElementById('cancelEditBtn').addEventListener('click', clearForm);
  window.getUsers();
});