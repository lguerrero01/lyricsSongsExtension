import browser from 'webextension-polyfill'
import * as UI from './UI';

let result = UI.divResultado;
export class API {
    
    constructor(artista, cancion) {
        this.artista = artista;
        this.cancion = cancion;
        this.consultarApi();
        console.log('desde api',this.artista,this.cancion);

    }
    
    consultarApi(){
        fetch(`https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`)
        .then( respuesta => respuesta.json())
               .then(resultado => {
                console.log('linea 17',resultado);
                    if(resultado.lyrics) {
                         console.log('linea 19');
                         const { lyrics } = resultado;
                         
                         UI.divResultado.innerHTML = `${lyrics}`;
                         UI.divResultado.classList.add('formato');
                         UI.headingResultado.textContent = 'Resultado';
                    } else {
                         // La canción no existe
                         clearHtml();
                         UI.headingResultado.textContent = '';
                         UI.divMensajes.innerHTML = 'La canción No existe, prueba con otra búsqueda';
                         UI.divMensajes.classList.add('alert', 'alert-warning');
                         setTimeout(() => {
                              UI.divMensajes.innerHTML = '';
                              UI.divMensajes.classList.remove('alert', 'alert-warning');
                              UI.formularioBuscar.reset();
                         }, 4000);
                    }
               })
               .catch(error => console.log(error))
    }
}

function clearHtml() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
      }
}
