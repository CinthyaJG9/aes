const socket = io.connect(`192.168.20.78:3000`);
function conectar(){
    socket.on('clave', function (clave){
        password = clave;
    });
    socket.on('cifrado', function (cifrado){
        textoCifrado = cifrado;
    });
    
}

var password = "";
var textoCifrado = "";


function descifrado(){
    var key = password;
    var descifrado = CryptoJS.AES.decrypt(textoCifrado, key);
    document.getElementById("cifrado-output").innerHTML= descifrado.toString(CryptoJS.enc.Utf8);
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