// se obtienen elementos del documento
const botonAdd = document.getElementById("botonAdd")
const ocultarFormulario = document.getElementById("formRegistro")
const botonguarda = document.getElementById('submitbutton')
// esta funcion activa y desactiva el estilo de la clase 'hidden' 
function togglemenu() {
    ocultarFormulario.classList.toggle('hidden')
}
// se escucha la accion click en el botonAdd y se llama a la funcion togglemenu que activa y desactiva la clase hidden
botonAdd.addEventListener("click", togglemenu);

// anula el uso de boton secundario del  mouse
document.oncontextmenu = function () {
    return false;
}


//se adquieren elementos DOM donde se encuentran los datos del pedido:
const form = document.getElementById('formRegistro');
const entradainput = document.getElementById('entradainput');
const fechainput = document.getElementById('fechainput');
const codigoinput = document.getElementById('codigoinput');
const nameinput = document.getElementById('nameinput');
const numinput = document.getElementById('numinput');
const productinput = document.getElementById('productinput');
const envioinput = document.getElementById('envioinput');
const facturainput = document.getElementById('facturainput');

//Se obtienen los datos de la tabla de datos de pedido//
const tablabody = document.getElementById('tablabody');

// Para almacenar estos datos en el localStore, al actualizar, no se borre la info:
// Se crea una variable "let" que es dinamica, con el nombre "data"
// Json.parse porque esos datos los adquirimos y convertimos en objetos almacenables como los arrays
// Guardamos en localStore en el navegador bajo la función formData() que son los datos de nuestro formulario:

let data = JSON.parse(localStorage.getItem('formData')) || [];

//funcion para que al evento "submit" (click al boton agregar), almacene la información en memoria
form.addEventListener('submit', function (event) {

    //elimina comportamientos por defecto del formulario
    event.preventDefault();
// se almacenan los valores  de las entradas en constantes
    const entrada = entradainput.value;
    const fecha = fechainput.value;
    const codigo = codigoinput.value;
    const name = nameinput.value;
    const num = numinput.value;
    const product = productinput.value;
    const envio = envioinput.value;
    const factura = facturainput.value;

    // condiciones para avisar mediante alert si falta alguno de los campos por rellenar
    if (entrada == "") {
        alert('seleccione Origen de pedido');
        return false;
    }
    if (fecha == "") {
        alert("Ingrese Fecha");
        return false;
    }
    if (codigo == "") {
        alert("Ingrese Codigo de producto");
        return false;
    }
    if (name == "") {
        alert("Ingrese Nombre de Cliente");
        return false;
    }
    if (num == "0" || num == "") {
        alert("Ingrese Cantidad del producto");
        return false;
    }
    if (product == "") {
        alert("Ingrese Nombre del producto");
        return false;
    }
    if (envio == "") {
        alert("Ingrese Metodo de envio");
        return false;
    }
    if (factura == "") {
        alert("Ingrese Metodo de facturacion");
        return false;
    }
    // si todos los valores estan presentes, se guardan en LocalStorage y se actualiza la tabla
    if (entrada && fecha && codigo && name && num && product && envio && factura) {
        const newData = { entrada, fecha, codigo, name, num, product, envio, factura };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();

        //Función para borrar y volver a iniciar el formulario
        form.reset();
    } else {
        // si no hay ninguna informacion se lanza este alert
        alert('Se necesita toda la informacion del pedido');
    }
})

//se declara la Función saveDataToLocalStorage para guardar los datos del formulario:
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}


//se declara la Función renderTable para renderizar o actualizar el formulario
function renderTable() {
    tablabody.innerHTML = '';

 //Para generar todos los registros del formulario en una tabla se itera el "data" (toda la información) y se crea la tabla
 // compuesta de un item e index, cada
    data.forEach(function (item, index) {
        const row = document.createElement('tr');
        const entradaCell = document.createElement('td');
        const fechaCell = document.createElement('td');
        const codigoCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const numCell = document.createElement('td');
        const productCell = document.createElement('td');
        const envioCell = document.createElement('td');
        const facturaCell = document.createElement('td');
        const actionCell = document.createElement('td');

        // boton editar
        const botonEditar = document.createElement('button')
        const botonEliminar = document.createElement('button')

        // Agregamos el contenido de la celda

        entradaCell.textContent = item.entrada;
        fechaCell.textContent = item.fecha;
        codigoCell.textContent = item.codigo;
        nameCell.textContent = item.name;
        numCell.textContent = item.num;
        productCell.textContent = item.product;
        envioCell.textContent = item.envio;
        facturaCell.textContent = item.factura;

        //  Botones de eliminar y editar
        botonEditar.classList.add('button', 'botonEditar');
        botonEliminar.classList.add('button', 'botonEliminar');

        // llama a la funcion editData al ocurrir el evento click en su boton respectivo
        botonEditar.addEventListener('click', function () {
            editData(index);
        })
        // lo mismo para deleteData
        botonEliminar.addEventListener('click', function () {
            deleteData(index);
        })
        // se agregan los botones al documento
        actionCell.appendChild(botonEditar);
        actionCell.appendChild(botonEliminar);

        // Creamos las filas o celdas para los textos que capture en la data:
        row.appendChild(entradaCell);
        row.appendChild(fechaCell);
        row.appendChild(codigoCell);
        row.appendChild(nameCell);
        row.appendChild(numCell);
        row.appendChild(productCell);
        row.appendChild(envioCell);
        row.appendChild(facturaCell);
        row.appendChild(actionCell);

        // Creamos las filas para tablabody
        tablabody.appendChild(row);

    })
}

function editData(index) {
    const item = data[index];
    entradainput.value = item.entrada;
    fechainput.value = item.fecha;
    codigoinput.value = item.codigo;
    nameinput.value = item.name;
    numinput.value = item.num;
    productinput.value = item.product;
    envioinput.value = item.envio;
    facturainput.value = item.factura;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
// window.onload = loadDataFromLocalStorage;