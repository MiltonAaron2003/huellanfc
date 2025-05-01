// Obtener registros desde el localStorage
function obtenerRegistros() {
    const registros = localStorage.getItem("peludos");
    return registros ? JSON.parse(registros) : [];
}

// Guardar registros en el localStorage
function guardarEnLocalStorage(registros) {
    localStorage.setItem("peludos", JSON.stringify(registros));
}

// Calcular edad de la mascota automáticamente
function calcularEdad() {
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    if (fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        document.getElementById('edad').value = edad;
    }
}

// Guardar un nuevo registro del peludo
function guardarRegistro() {
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    calcularEdad(); // Calcular edad antes de guardar
    const edad = document.getElementById("edad").value;
    const Raza = document.getElementById("Raza").value;
    const alergias = document.getElementById("alergias").value;
    const enfermedad = document.getElementById("enfermedad").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const seguroMedico = document.getElementById("seguro_medico").value;
    const domicilio = document.getElementById("domicilio").value;

    const contacto1Nombre = document.getElementById("contacto1_nombre").value;
    const contacto1Parentesco = document.getElementById("contacto1_parentesco").value;
    const contacto1Telefono = document.getElementById("contacto1_telefono").value;

    const contacto2Nombre = document.getElementById("contacto2_nombre").value;
    const contacto2Parentesco = document.getElementById("contacto2_parentesco").value;
    const contacto2Telefono = document.getElementById("contacto2_telefono").value;

    const nuevoRegistro = {
        nombre,
        fechaNacimiento,
        edad,
        Raza,
        alergias,
        enfermedad,
        medicamentos,
        seguroMedico,
        domicilio,
        contacto1: { nombre: contacto1Nombre, parentesco: contacto1Parentesco, telefono: contacto1Telefono },
        contacto2: { nombre: contacto2Nombre, parentesco: contacto2Parentesco, telefono: contacto2Telefono }
    };

    const registros = obtenerRegistros();
    registros.push(nuevoRegistro);
    guardarEnLocalStorage(registros);

    alert("Registro guardado correctamente 🐶");
    window.location.href = "consultar.html"; // Redirigir a la vista de registros
}

// Evento al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    if (fechaNacimientoInput) {
        fechaNacimientoInput.addEventListener('change', calcularEdad);
    }
});
