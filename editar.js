document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('editIndex');  // Cambié 'index' a 'editIndex' para ser consistente con el enlace en 'ver.js'
    
    if (index !== null) {
        cargarDatosFormulario(index);
    }

    // Este es el paso importante
    document.getElementById('formularioEditar').addEventListener('submit', guardarEdicion);
});

function cargarDatosFormulario(index) {
    const registros = JSON.parse(localStorage.getItem('peludos')) || [];
    const registro = registros[index];

    if (registro) {
        document.getElementById('nombre').value = registro.nombre || '';
        document.getElementById('edad').value = registro.edad || '';
        document.getElementById('Raza').value = registro.Raza || '';
        document.getElementById('medicamentos').value = registro.medicamentos || '';
        document.getElementById('seguroMedico').value = registro.seguroMedico || '';
        document.getElementById('domicilio').value = registro.domicilio || '';

        // Aseguramos que los contactos existan antes de asignarlos
        if (registro.contacto1) {
            document.getElementById('contacto1_nombre').value = registro.contacto1.nombre || '';
            document.getElementById('contacto1_parentesco').value = registro.contacto1.parentesco || '';
            document.getElementById('contacto1_telefono').value = registro.contacto1.telefono || '';
        }

        if (registro.contacto2) {
            document.getElementById('contacto2_nombre').value = registro.contacto2.nombre || '';
            document.getElementById('contacto2_parentesco').value = registro.contacto2.parentesco || '';
            document.getElementById('contacto2_telefono').value = registro.contacto2.telefono || '';
        }
    }
}

function guardarEdicion(event) {
    event.preventDefault();
    const index = new URLSearchParams(window.location.search).get('editIndex');  // Cambié 'index' a 'editIndex' para ser consistente con el enlace en 'ver.js'
    const registros = JSON.parse(localStorage.getItem('peludos')) || [];

    if (index !== null && registros[index]) {
        const registroEditado = {
            nombre: document.getElementById('nombre').value,
            edad: document.getElementById('edad').value,
            Raza: document.getElementById('Raza').value,
            medicamentos: document.getElementById('medicamentos').value,
            seguroMedico: document.getElementById('seguroMedico').value,
            domicilio: document.getElementById('domicilio').value,
            contacto1: {
                nombre: document.getElementById('contacto1_nombre').value,
                parentesco: document.getElementById('contacto1_parentesco').value,
                telefono: document.getElementById('contacto1_telefono').value
            },
            contacto2: {
                nombre: document.getElementById('contacto2_nombre').value,
                parentesco: document.getElementById('contacto2_parentesco').value,
                telefono: document.getElementById('contacto2_telefono').value
            }
        };

        registros[index] = registroEditado;
        localStorage.setItem('peludos', JSON.stringify(registros));
        window.location.href = "consultar.html"; // Redirige a la página consultar después de guardar.
    } else {
        alert('Error: No se pudo editar el registro. Índice inválido.');
    }
}
