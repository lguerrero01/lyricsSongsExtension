import browser from 'webextension-polyfill'
import * as UI from './UI.js';
import { API } from './background.js';

UI.formularioBuscar.addEventListener('submit', (e)=> {
    e.preventDefault();

    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;
    console.log(cancion, artista)
    new API(artista, cancion);
})

