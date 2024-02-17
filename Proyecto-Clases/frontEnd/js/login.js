const URL = '../../backEnd/php/';
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("login").addEventListener('submit', function(e){
        e.preventDefault();
        const form = new FormData(this);
        console.log(form)
        fetch(URL+'login.php', {
            method:'POST',
            body: form
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);
            if(data.success){
                const id = data.id;
                localStorage.setItem('id', id);
                location.href ='inicio.html';
            }
            else{
                const divMensaje = document.getElementById('mensaje');

                let p = document.createElement('p')
                p.innerText= 'Credenciales incorrectas!';
                // divMensaje.style.background = ''
                divMensaje.append(p);
            }           
        })
        .catch(error => {
            console.error('Error del servidor'+error)
        })
    });
});