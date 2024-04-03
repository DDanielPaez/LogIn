const usuario = JSON.parse(localStorage.getItem('usuario'));
const formulario = document.querySelector('#form-todos')
const inputTarea = document.querySelector('#form-input')
const listado = document.querySelector('#todos-list')
const cerrarBtn = document.querySelector('#cerrar-btn')



if (!usuario){
    window.location.href = '../home/index.html'
}

// mostrar las tareas de ese usuario 
// consulta al recurso http://localhost:3000/tareas

const consultarListado = async (e)=>{

    const listadoTareas = await fetch('http://localhost:3000/tareas', {
        method: 'GET'
    });

    const listaT = await listadoTareas.json();
    // console.log(listaT);

    const arrayT = listaT.filter(i => i.idUsuario === usuario.id);

    console.log(arrayT);

    arrayT.forEach(i => {
        const listas = document.createElement('li');

    listas.innerHTML =`
        <li id=${i.id} class="todo-item">
            <button class="delete-btn">&#10006;</button>
            <p>${i.textoTarea}</p>
            <button class="check-btn">&#10003;</button></li>`
    listado.appendChild(listas);
    inputTarea.value = "";
    });

}


consultarListado();





formulario.addEventListener('submit', async (e)=>{
    e.preventDefault();    
        await fetch('http://localhost:3000/tareas', {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json'
                },
                // Solo recibe strings
                body: JSON.stringify({
                    textoTarea: inputTarea.value,
                    idUsuario:usuario.id
                })
            });

            const id = await fetch ('http://localhost:3000/tareas', {
                method: 'GET'
            })

            const idTarea = await id.json()



            const idDefi = idTarea[idTarea.length-1].id;

            console.log(idDefi);


            // Mostrar listado de elementos
            const listas = document.createElement('li');
            listas.innerHTML = `
            <li id=${idDefi} class="todo-item">
                <button class="delete-btn">&#10006;</button>
                <p>${inputTarea.value}</p>
                <button class="check-btn">&#10003;</button></li>`
    listado.appendChild(listas)
    inputTarea.value="";



    });
  
cerrarBtn.addEventListener('click', (e)=>{
    localStorage.removeItem('usuario');
    window.location.href = "../home/index.html"


})



listado.addEventListener('click', async (e)=>{

    if(e.target.classList.contains('delete-btn')) {
        const element = e.target.parentElement.id;
        console.log(`http://localhost:3000/tareas/${element}`);

        await fetch(`http://localhost:3000/tareas/${element}`,{
            method: 'DELETE'
        })

        e.target.parentElement.remove();
    }else if(e.target.classList.contains('check-btn')){
        const ruta = e.target.parentElement.querySelector('p');
        // console.log('Hola mundo');
        const element = e.target.parentElement.id;
        // metodo update o patch
    const resultadoJson = await fetch(`http://localhost:3000/tareas/${element}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({checked:ruta.classList.contains('check-todo')?false:true})
        })

        const res = await resultadoJson.json()
       

        ruta.classList.toggle('check-todo')
    }

})