var socket = io();
var form = document.getElementById("form-cifrar")
var key = document.getElementById('clave').value;
var entradaCifrado = document.getElementById('descifrar');

form.addEventListener('submit', function (e){
    e.preventDefault();
    socket.emit('key', key);
    var cifrado = document.getElementById("cifrado-output").innerHTML;
    socket.emit('mensaje cifrado', cifrado);
    document.getElementById('clave').value = "";
    document.getElementById('mensaje').value = "";
});

let keyRecibida = "";
socket.on('key', key=>{
    keyRecibida = key;
    console.log(key);
    
    socket.on('mensaje cifrado', cifrado=>{
        entradaCifrado.innerHTML = cifrado;
        console.log("se recibio el mensaje");
    });
});



function cifrado(){
    var bits = document.getElementById('condicion').value;
    var password = document.getElementById('clave').value;
    var mensaje= document.getElementById('mensaje').value;
    if(bits==128){
        if(password.length != 16){
            alert("La clave para AES-128 debe ser 16 caractéres");
        }
        if(password.length == 16){                 
            var cifrado = CryptoJS.AES.encrypt(mensaje, password);
            //var descifrado = CryptoJS.AES.decrypt(cifrado, password);

            document.getElementById("cifrado-output").innerHTML= cifrado;
            //document.getElementById("descifrado-output").innerHTML= descifrado.toString(CryptoJS.enc.Utf8);
        }
    } 
    if(bits == 192){
        if(password.length != 24){
            alert("La clave para AES-192 debe ser de 24 caractéres");
        }
        if(password.length == 24){
            var cifrado = CryptoJS.AES.encrypt(mensaje, password);
            //var descifrado = CryptoJS.AES.decrypt(cifrado, password);

            document.getElementById("cifrado-output").innerHTML= cifrado;
            //document.getElementById("descifrado-output").innerHTML= descifrado.toString(CryptoJS.enc.Utf8);
        }
    }
        
    if(bits == 256){
        if(password.length != 32){
            alert("La clave para AES-256 debe ser de 32");
        }
        if(password.length == 32){
            var cifrado = CryptoJS.AES.encrypt(mensaje, password);
            //var descifrado = CryptoJS.AES.decrypt(cifrado, password);
        
            document.getElementById("cifrado-output").innerHTML= cifrado;
            //document.getElementById("descifrado-output").innerHTML= descifrado.toString(CryptoJS.enc.Utf8);
        }
    }

    if(!bits){
        alert("Ingrese el tipo de cifrado AES")
    }
}
function saveTextAsFile()
{      
// grab the content of the form field and place it into a variable
    var textToWrite = document.getElementById("cifrado-output").innerHTML;
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = "TextoCifrado.txt";
    
// Optionally allow the user to choose a file name by providing 
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;
 
// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    
// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
          
// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);
    
// click the new link
    downloadLink.click();
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}

function descifrado(){
    var password = document.getElementById('clave').value;
    var descifrado = CryptoJS.AES.decrypt(cifrado, password);
    document.getElementById("demo03").innerHTML= descifrado.toString(CryptoJS.enc.Utf8);
}

async function subirArchivoDescifrar(file){

    var txt = await file.text();
    document.getElementById('leeArchivoDescifrar').textContent = txt;

}

// Vvalidamos
const Validar = () =>{

    var archivoEscogido = document.getElementById('archivoDescifrar');
    var contenidoarchivoEscogido = archivoEscogido.value;
    var ext = /(.txt)$/i;

    if(!ext.exec(contenidoarchivoEscogido)){

        alert('Solo leemos archivos txt :C');
        archivoEscogido.value = '';
        return false;

    }
    else{

        if(archivoEscogido.files && archivoEscogido.files[0]){

            var lector = new FileReader();
            lector.onload = function(event){

                subirArchivoDescifrar(archivoEscogido.files[0]); 

            }
        

            lector.readAsDataURL(archivoEscogido.files[0]);

        }

    }}