// aquí va el código

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("number");
let total = document.getElementById("precioTotal");
let alertError = document.getElementById("alertValidaciones");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let btnAgregar = document.getElementById("btnAgregar");
let contadorProductos = document.getElementById("contadorProductos"); 
let btnClear = document.getElementById("btnClear");

let precioTotal = document.getElementById("precioTotal");
let productosTotal = document.getElementById("productosTotal");

let contador=0; 
let totalEnproductos = 0;
let costoTotal= 0;
let precio = 0;
let cantidad = 0;
let datos = [];// new Array();
let totalProductos = 0;
let idTimeout;


//genera precio al Azar
    function getPrecio() {
     
     return Math.floor(Math.random() *50 *100) / 100;
    }//get precio

    function validarNombre() {
        return(txtNombre.value.length >=2) ?true:false;
    }//validarNombre

    function validarCantidad(){
      if  (txtNumber.value.length == 0) {
        return false;
      }//if

      if (isNaN(txtNumber.value)){
        return false;
      }

      if(parseFloat(txtNumber.value)<=0){
        return false;   
      }

      return true;
    }

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML="";
    if ( (! validarNombre()) || (! validarCantidad()) ){
        let lista ="<ul>";
        if (! validarNombre()) {
            txtNombre.style.border = "red thin solid"
            lista += "<li> Se debe escribir un nombre valido </li>"
        }// if validar nombre

        if (! validarCantidad()) {
            txtNumber.style.border = "red thin solid"
            lista += "<li> Se debe escribir una cantidad valida </li>"
        }// if validar Cantidad

        lista +="</ul>";
        alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);
        alertError.style.display="block";

        idTimeout = setTimeout(function(){
            alertError.style.display="none";

        }, 5000);
        return false 
    }//if !validaciones

    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertError.style.display="none";

    contador++;
    contadorProductos.innerHTML=contador;

    cantidad = parseFloat(txtNumber.value);
    totalEnproductos += cantidad;
    productosTotal.innerHTML=totalEnproductos;
    precio = getPrecio();
    costoTotal +=precio * cantidad;
    precioTotal.innerHTML = "$"+costoTotal.toFixed(2);

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnproductos", totalEnproductos);
    localStorage.setItem("costoTotal", costoTotal);
    
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    cuerpoTabla[0].insertAdjacentHTML("beforeend",row);

    let elemento = `{
        "id": ${contador},
        "nombre" : "${txtNombre.value}",
        "cantidad": ${txtNumber.value},
        "precio": ${precio}
     }`;
   
     datos.push( JSON.parse(elemento) );
     //console.log(datos);
     localStorage.setItem("datos", JSON.stringify(datos) );

     txtNombre.value="";    
     txtNumber.value="";
     txtNombre.focus();
 
});//click btnAgregar


txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    //txtNombre.value = txtNombre.value.trim();
    event.target.value = event.target.value.trim();
});

txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim();
});

window.addEventListener("load", function(event){
    let tmp = localStorage.getItem("contadorProductos");
    
    if(tmp!=null){
        contador=parseInt(tmp);
        contadorProductos.innerHTML=contador;
    }

    tmp = localStorage.getItem("totalEnproductos");
    if(tmp!=null){
       totalEnproductos = parseInt(tmp);
       productosTotal.innerHTML=totalEnproductos;
    }

    tmp = localStorage.getItem("costoTotal");
    if(tmp!=null){
        costoTotal = parseFloat(tmp);
        precioTotal.innerHTML="$ "+ costoTotal.toFixed(2);
     }//if

    tmp= localStorage.getItem("datos");
    if(tmp !=null){
        datos = JSON.parse(tmp);
        datos.forEach(element => {
            cuerpoTabla[0].innerHTML += `<tr>
            <th>${element.id}</th>
            <td>${element.nombre}</td>
            <td>${element.cantidad}</td>
            <td>${element.precio}</td>
            </tr>`;
        });

    }//if

});

btnClear.addEventListener ("click", function(event){
    contador= 0;
    contadorProductos.innerHTML= contador;
    totalEnProductos=0;
    productosTotal.innerHTML=totalEnProductos;
    costoTotal= 0;
    precioTotal.innerHTML ="$ "+ costoTotal.toFixed(2);
    cuerpoTabla[0].innerHTML="";

    localStorage.removeItem("contadorProductos");
    localStorage.removeItem("totalEnProductos");
    localStorage.removeItem("costoTotal");
    localStorage.removeItem("datos");
    
    localStorage.clear();

});