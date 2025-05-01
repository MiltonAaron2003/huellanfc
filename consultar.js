document.addEventListener('DOMContentLoaded', function () {
  mostrarRegistros();
});

// Mostrar registros guardados
function mostrarRegistros() {
  const registros = JSON.parse(localStorage.getItem('peludos')) || [];
  const registrosList = document.getElementById('registrosList');

  if (registros.length === 0) {
    registrosList.innerHTML = '<p>No hay registros disponibles.</p>';
    return;
  }

  registrosList.innerHTML = registros.map((registro, index) => `
    <div class="registro-item">
      <h3>${registro.nombre}</h3>
      <p><strong>Edad:</strong> ${registro.edad}</p>
      <p><strong>Raza:</strong> ${registro.Raza || 'No especificada'}</p>
      <p><strong>Domicilio:</strong> ${registro.domicilio}</p>
      <button onclick="verDetalle(${index})">Ver Detalles</button>
    </div>
  `).join('');
}

// Ver detalles del registro
function verDetalle(index) {
  localStorage.setItem('verIndex', index);
  window.location.href = 'ver.html';
}
