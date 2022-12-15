// aquí va el código

let txtNombre = document.getElementById("nombre");
let txtNumber = document.getElementById("number");
let total = document.getElementById("precioTotal");
let alertError = document.getElementById("alertValidaciones");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let btnAgregar = document.getElementById("btnAgregar");
let contadorProductos = document.getElementById("contadorProductos"); 


let precioTotal = document.getElementById("precioTotal");
let productosTotal = document.getElementById("productosTotal");
let contador=0;
let totalEnproductos = 0;
let costoTotal= 0;
let precio = 0;
let cantidad = 0;

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

    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    cuerpoTabla[0].insertAdjacentHTML("beforeend",row);

    txtNombre.value="";
    txtNumber.value="";

    txtNombre.focus();

});
