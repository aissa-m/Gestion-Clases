const URL = '../../backEnd/php/';
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("register"); // Obtenemos el elemento del formulario por su ID

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const formData = new FormData(this); // Crea un objeto FormData basado en el formulario actual

        fetch(URL + 'register.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const divMensaje = document.getElementById('mensaje');
            
            let p = document.createElement('p');
            p.innerText = 'Registro exitoso!';
            divMensaje.append(p);

            form.reset(); // Restablecer el formulario utilizando el elemento del formulario directamente
        })
        .catch(error => {
            console.error('Error del servidor' + error);
        });
    });
});
