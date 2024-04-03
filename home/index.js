// Crear selectores
const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');


//Asincronismo se declara al llamar la funcion "async miFuncion() {}"

formC.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const consultaUsuarios = await fetch('http://localhost:3000/usuarios', {
        method: 'GET'
    });

    const listaDeUsuarios = await consultaUsuarios.json();
    // console.log(listaDeUsuarios);

    // Validar que el usuario exista o no
    const existeUsuario = listaDeUsuarios.find(i => {
        return i.nombre === createInput.value
    });

    // console.log(existeUsuario);
 
    if (!createInput.value) {
        //campo vacio
        // console.log('Campo Vacio');
        notificacion.innerHTML = 'El campo de usuario no puede estar vacio'
        notificacion.classList.add('show-notification');
        
        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)

    }else if(existeUsuario){
        console.log('El usuario existe');

        notificacion.innerHTML = 'El usuario ya existe'
        notificacion.classList.add('show-notification')

        setTimeout(() => {
            notificacion.classList.remove('show-notification') 
        }, 3000);

    }else{
        // Campo lleno
        // console.log('Campo lleno');

        // CRUD
        // El await va donde solicito el recurso
        await fetch('http://localhost:3000/usuarios', {
            method: 'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            // Solo recibe string
            body: JSON.stringify({
                nombre: createInput.value
            })
        });

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000);
        createInput.value = '';
    }

})

formL.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const consultaUsuarios = await fetch('http://localhost:3000/usuarios', {
        method: 'GET'
    });

    const listaDeUsuarios = await consultaUsuarios.json();
    // console.log(listaDeUsuarios);

    const existeUsuario = listaDeUsuarios.find(i => {
        return i.nombre === loginInput.value
    });


    if(loginInput.value == ''){
        console.log('campo vacio');

        notificacion.innerHTML = 'El campo de usuario no puede estar vacio'
        notificacion.classList.add('show-notification');
        
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);

    }else if (!existeUsuario) {
        // console.log('El usuario no existe');

        notificacion.innerHTML = 'El usuario no existe'
        notificacion.classList.add('show-notification');
        
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);
    }else{
        // console.log('El usuario existe');

        notificacion.innerHTML = 'Ha iniciado sesion';
        notificacion.classList.add('show-notification');
        
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 3000);

        localStorage.setItem('usuario', JSON.stringify(existeUsuario));
        window.location.href = '../tareas/tareas.html';
    }

})