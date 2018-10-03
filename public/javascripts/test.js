'use strict';

(function(document){

    // console.log("document radi!")

    /*Create element dinamic */
    let naslov = document.createElement("h1");
    let naslov_val = document.createTextNode("GDE SI BRE");
    /*sjedinjavanje elementa i njegovog texta*/
    naslov.appendChild(naslov_val);

    /* dodavanje u document */
    document.body.appendChild(naslov);


}(document));