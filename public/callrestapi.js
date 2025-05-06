
// callrestapi.js – Adaptado a “Hongos”
const API_URL = 'http://35.243.205.220/api/users';
let mushroomsData = [];

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
  document.getElementById('mushroomForm').reset();
  document.getElementById('mushroomId').value = '';
  document.getElementById('saveBtn').textContent = 'Guardar';
  document.getElementById('cancelEditBtn').style.display = 'none';
};

// Dibuja la tabla de hongos
const renderTable = (items) => {
  const tbody = document.querySelector('#mushroomsTable tbody');
  tbody.innerHTML = items.map(m => `
    <tr>
      <td>${m.id}</td>
      <td>${m.name}</td>
      <td>${m.species}</td>
      <td>${m.edible ? 'Sí' : 'No'}</td>
      <td>${m.description || '-'}</td>
      <td>${new Date(m.createdAt).toLocaleString()}</td>
      <td>
        <button onclick="editMushroom(${m.id})">Editar</button>
        <button onclick="deleteMushroom(${m.id})">Borrar</button>
      </td>
    </tr>
  `).join('');
};

// ====================== [FUNCIONES CRUD] ======================
window.getMushrooms = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const { mushrooms } = await res.json();
    mushroomsData = mushrooms;
    renderTable(mushrooms);
  } catch (err) {
    showMessage(`Error cargando hongos: ${err.message}`, 'error');
  }
};

window.postMushroom = async () => {
  const form = document.getElementById('mushroomForm');
  const data = {
    name: form.name.value.trim(),
    species: form.species.value.trim(),
    edible: form.edible.checked,
    description: form.description.value.trim()
  };
  if (!data.name || !data.species) {
    return showMessage('Nombre y especie son requeridos', 'error');
  }
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error desconocido');
    showMessage(`Hongo “${json.mushroom.name}” creado`);
    await getMushrooms();
    clearForm();
  } catch (err) {
    showMessage(`Error creando hongo: ${err.message}`, 'error');
  }
};

window.updateMushroom = async (id) => {
  const form = document.getElementById('mushroomForm');
  const data = {
    name: form.name.value.trim(),
    species: form.species.value.trim(),
    edible: form.edible.checked,
    description: form.description.value.trim()
  };
  if (!data.name || !data.species) {
    return showMessage('Nombre y especie son requeridos', 'error');
  }
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error desconocido');
    showMessage(`Hongo “${json.mushroom.name}” actualizado`);
    await getMushrooms();
    clearForm();
  } catch (err) {
    showMessage(`Error actualizando: ${err.message}`, 'error');
  }
};

window.deleteMushroom = async (id) => {
  if (!confirm(`¿Eliminar hongo ${id}?`)) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      showMessage('Hongo eliminado', 'warning');
      await getMushrooms();
      return;
    }
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error eliminando');
    showMessage(json.message || 'Hongo eliminado');
    await getMushrooms();
  } catch (err) {
    showMessage(`Error eliminando: ${err.message}`, 'error');
  }
};

// ====================== [FUNCIONES ADICIONALES] ======================
window.editMushroom = (id) => {
  const m = mushroomsData.find(x => x.id===id);
  if (!m) return showMessage('Hongo no encontrado', 'error');
  const form = document.getElementById('mushroomForm');
  form.reset();
  document.getElementById('mushroomId').value = m.id;
  form.name.value = m.name;
  form.species.value = m.species;
  form.edible.checked = m.edible;
  form.description.value = m.description;
  document.getElementById('saveBtn').textContent = 'Actualizar';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
};

window.saveMushroom = async (e) => {
  e.preventDefault();
  const id = document.getElementById('mushroomId').value;
  id ? await updateMushroom(id) : await postMushroom();
};

// ====================== [INICIALIZACIÓN] ======================
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mushroomForm');
  form.addEventListener('submit', saveMushroom);
  document.getElementById('loadBtn').addEventListener('click', getMushrooms);
  document.getElementById('cancelEditBtn').addEventListener('click', clearForm);
  getMushrooms();
});
