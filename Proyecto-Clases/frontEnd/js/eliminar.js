document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar')) {
            const id = e.target.dataset.id;
            const tipo = e.target.dataset.tipo;

            console.log(id);
            console.log(tipo);

            if (confirm('¿Estás seguro de querer eliminar este registro?')) {
                fetch('http://localhost:3000/backEnd/php/eliminar.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, tipo })
                })
                .then(response => response.json())
                .then(data => {
                    if (data === 'Exito') {
                        alert('Registro eliminado con éxito');
                        location.reload(); // O alguna otra lógica para actualizar la vista
                    } else {
                        alert('Error al eliminar el registro');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        }
    });
});


