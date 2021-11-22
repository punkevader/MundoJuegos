const carrito = document.getElementById('carrito');
const gamers = document.getElementById('lista-gamer');
const listagamers = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    gamers.addEventListener('click', comprargamer);
    carrito.addEventListener('click', eliminargamer);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprargamer(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const gamer = e.target.parentElement.parentElement;
        leerDatosgamer(gamer);
    }
}

function leerDatosgamer(gamer) {
    const infogamer = {
        imagen: gamer.querySelector('img').src,
        titulo: gamer.querySelector('h4').textContent,
        precio: gamer.querySelector('.precio span').textContent,
        id: gamer.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infogamer);
}

function insertarCarrito(gamer) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${gamer.imagen}" width=100>
        </td>
        <td>${gamer.titulo}</td>
        <td>${gamer.precio}</td>
        <td>
            <a href="#" class="borrar-gamer" data-id="${gamer.id}">X</a>
        </td>
    `;
    listagamers.appendChild(row);
    guardargamerLocalStorage(gamer);
}


function eliminargamer(e) {
    e.preventDefault();

    let gamer,
    gamerId;
    if(e.target.classList.contains('borrar-gamer')){
        e.target.parentElement.parentElement.remove();
        gamer = e.target.parentElement.parentElement;
        gamerId = gamer.querySelector('a').getAttribute('data-id');
    }
    eliminargamerLocalStorage(gamerId);
}

function vaciarCarrito() {
    while(listagamers.firstChild){
        listagamers.removeChild(listagamers.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardargamerLocalStorage(gamer) {
    let gamers;
    gamers = obtenergamersLocalStorage();
    gamers.push(gamer);
    localStorage.setItem('gamers', JSON.stringify(gamers))
}

function obtenergamersLocalStorage() {
    let gamersLS;

    if(localStorage.getItem('gamers') === null){
        gamersLS = [];
    } else {
        gamersLS = JSON.parse(localStorage.getItem('gamers'));
    }
    return gamersLS;
}

function leerLocalStorage() {
    let gamersLS;

    gamersLS = obtenergamersLocalStorage();

    gamersLS.forEach(function(gamer){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${gamer.imagen}" width=100> 
            </td>
            <td>${gamer.titulo}</td>
            <td>${gamer.precio}</td>
            <td>
                <a href="#" class="borrar-gamer" data-id="${gamer.id}">X</a>
            </td>
        `;
        listagamers.appendChild(row);
    });

}

function eliminargamerLocalStorage(gamer) {
    let gamersLS;

    gamersLS = obtenergamersLocalStorage();

    gamersLS.forEach(function(gamersLS, index){
        if(gamersLS.id === gamer) {
            gamersLS.splice(index, 1)
        }
    });

    localStorage.setItem('gamers', JSON.stringify(gamersLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}



document.getElementById("Eleccion").onchange=listadocateg;

function listadocateg() {
    if (document.getElementById("Eleccion").value =="") {
      document.getElementById("prok").innerHTML ="";
      return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == XMLHttpRequest.DONE){
        if(xhttp.status==200){
          document.getElementById("prok").innerHTML = xhttp.responseText;
        }
        else if(xhttp.status="400"){
          alert('Hubo un error al 400');
        }else{
          alert('Error 200');
        }
      }
    }
    xhttp.open("GET",cargadotexto(),true);
    xhttp.send();
  
    function cargadotexto(){
      if(document.getElementById("Eleccion").value=="1"){
        return "categoria/Accion.txt";
      }else if(document.getElementById("Eleccion").value=="2"){
        return "categoria/Estrategia.txt";
      }else if(document.getElementById("Eleccion").value=="3"){
        return "categoria/Terror.txt";
      }
    }
  }