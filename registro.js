document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', guardarRegistro);
  });
  
  // Función para guardar el registro
  function guardarRegistro(event) {
    event.preventDefault();
  
    const registros = JSON.parse(localStorage.getItem('peludos')) || [];
    const nuevoRegistro = {
      nombre: document.getElementById('nombre').value,
      edad: document.getElementById('edad').value,
      Raza: document.getElementById('raza').value,
      medicamentos: document.getElementById('medicamentos').value,
      seguroMedico: document.getElementById('seguroMedico').value,
      domicilio: document.getElementById('domicilio').value,
      contacto1: {
        nombre: document.getElementById('contacto1_nombre').value,
        parentesco: document.getElementById('contacto1_parentesco').value,
        telefono: document.getElementById('contacto1_telefono').value,
      },
      contacto2: {
        nombre: document.getElementById('contacto2_nombre').value,
        parentesco: document.getElementById('contacto2_parentesco').value,
        telefono: document.getElementById('contacto2_telefono').value,
      },
    };
  
    registros.push(nuevoRegistro);
    localStorage.setItem('peludos', JSON.stringify(registros));
  
    // Redirigir a la página de consultar
    window.location.href = 'consultar.html';
  }
  