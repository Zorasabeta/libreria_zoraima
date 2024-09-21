document.addEventListener('DOMContentLoaded', () => {
    const editarForm = document.getElementById('editarForm');
    const librosTabla = document.getElementById('librosTabla').getElementsByTagName('tbody')[0];
    const modalEditar = document.getElementById('modalEditar');
    const spanClose = document.querySelector('.close');

    // Abrir el modal cuando se edita un libro
    const abrirModal = () => {
        modalEditar.style.display = 'block';
    };

    // Cerrar el modal
    const cerrarModal = () => {
        modalEditar.style.display = 'none';
    };

    spanClose.addEventListener('click', cerrarModal);
    window.addEventListener('click', (event) => {
        if (event.target === modalEditar) {
            cerrarModal();
        }
    });

    // Función para llenar el modal con los datos del libro
    const llenarModalConDatos = (libro) => {
        document.getElementById('editarIdLibro').value = libro.idLibro;
        document.getElementById('editarTituloLibro').value = libro.tituloLibro;
        document.getElementById('editarAutor').value = libro.autor;
        document.getElementById('editarEditorial').value = libro.editorial;
        document.getElementById('editarAnioPublicacion').value = libro.anioPublicacion;
        document.getElementById('editarCategoriaLibro').value = libro.categoriaLibro;
        document.getElementById('editarDisponible').value = libro.disponible;
        document.getElementById('editarPrecio').value = libro.precio;
    };

    // Muestra los libros y permite edición/eliminación
    const fetchLibros = async() => {
        const response = await fetch('/libros');
        const libros = await response.json();
        librosTabla.innerHTML = '';
        libros.forEach(libro => {
            const row = librosTabla.insertRow();
            row.innerHTML = `
                <td>${libro.idLibro}</td>
                <td>${libro.tituloLibro}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${libro.anioPublicacion}</td>
                <td>${libro.categoriaLibro}</td>
                <td>${libro.disponible}</td>
                <td>${libro.precio}</td>
                <td>
                    <button class="editar-btn">Editar</button>
                    <button class="eliminar-btn">Eliminar</button>
                </td>
            `;
            // Agregar eventos a los botones
            row.querySelector('.editar-btn').addEventListener('click', () => {
                llenarModalConDatos(libro);
                abrirModal();
            });
            row.querySelector('.eliminar-btn').addEventListener('click', () => eliminarLibro(libro.idLibro));
        });
    };

    // Actualizar un libro existente
    editarForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const formData = new FormData(editarForm);
        const data = Object.fromEntries(formData.entries());
        await fetch(`/libros/${data.idLibro}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        cerrarModal();
        fetchLibros();
    });

    // Función para eliminar un libro
    const eliminarLibro = async(idLibro) => {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (confirmacion) {
            await fetch(`/libros/${idLibro}`, {
                method: 'DELETE',
            });
            fetchLibros();
        }
    };

    fetchLibros();
});
