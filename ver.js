document.addEventListener('DOMContentLoaded', function () {
    mostrarRegistroIndividual();
    obtenerUbicacion(); // ✅ Aquí llamamos la función para ubicación en vivo
});

// Mostrar el registro individual
function mostrarRegistroIndividual() {
    const registroDetalle = document.getElementById('registroDetalle');
    const index = localStorage.getItem('verIndex');
    const registros = JSON.parse(localStorage.getItem('peludos')) || [];

    if (index !== null && registros[index]) {
        const registro = registros[index];
        
        registroDetalle.innerHTML = `
            <h3>Información del Animal</h3>
            <p><strong>Nombre:</strong> ${registro.nombre}</p>
            <p><strong>Edad:</strong> ${registro.edad}</p>
            <p><strong>Raza:</strong> ${registro.Raza || 'No especificada'}</p>
            <p><strong>Medicamentos:</strong> ${registro.medicamentos || 'Ninguno'}</p>
            <p><strong>Seguro Médico:</strong> ${registro.seguroMedico || 'No tiene'}</p>
            <p><strong>Domicilio:</strong> ${registro.domicilio}</p>

            <h3>Contacto de Emergencia 1</h3>
            <p><strong>Nombre:</strong> ${registro.contacto1?.nombre || 'No proporcionado'}</p>
            <p><strong>Parentesco:</strong> ${registro.contacto1?.parentesco || 'No especificado'}</p>
            <p><strong>Teléfono:</strong> ${registro.contacto1?.telefono || 'No disponible'}</p>

            <h3>Contacto de Emergencia 2</h3>
            <p><strong>Nombre:</strong> ${registro.contacto2?.nombre || 'No proporcionado'}</p>
            <p><strong>Parentesco:</strong> ${registro.contacto2?.parentesco || 'No especificado'}</p>
            <p><strong>Teléfono:</strong> ${registro.contacto2?.telefono || 'No disponible'}</p>
        `;
    } else {
        registroDetalle.innerHTML = `<p>No se encontró el registro.</p>`;
    }
}

// Redirigir a la página de edición del registro
function editarRegistro() {
    const index = localStorage.getItem('verIndex');
    if (index !== null) {
        window.location.href = `registro.html?editIndex=${index}`;
    }
}

// Obtener la ubicación en vivo
function obtenerUbicacion() {
    const ubicacionMensaje = document.getElementById('ubicacionMensaje');
    const mapLink = document.getElementById('mapLink');

    if (!navigator.geolocation) {
        ubicacionMensaje.textContent = 'La geolocalización no es soportada por tu navegador.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            ubicacionMensaje.textContent = `Latitud: ${latitud.toFixed(6)}, Longitud: ${longitud.toFixed(6)}`;
            mapLink.href = `https://www.openstreetmap.org/?mlat=${latitud}&mlon=${longitud}&zoom=15`;
            mapLink.textContent = "Ver ubicación en el mapa";
            mapLink.style.display = "inline-block";
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    ubicacionMensaje.textContent = "Permiso denegado para obtener la ubicación.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    ubicacionMensaje.textContent = "La ubicación no está disponible.";
                    break;
                case error.TIMEOUT:
                    ubicacionMensaje.textContent = "Tiempo de espera agotado al obtener la ubicación.";
                    break;
                default:
                    ubicacionMensaje.textContent = "Error desconocido al obtener la ubicación.";
                    break;
            }
        },
        { enableHighAccuracy: true }
    );
}
