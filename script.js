const tituloCancion = document.querySelector('.reproductor h1');
const nombreArtista = document.querySelector('.reproductor p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl')
const btn_atras = document.querySelector('.controles button.atras');

const btn_siguiente = document.querySelector('.controles button.siguiente');
const btn_iniciar_pausar = document.querySelector('.controles button.iniciar-pausar');


const canciones = [
    {
        titulo: 'NO ESTOY',
        nombre:'AFTER,  MILO J,  AKIM 88',
        ruta: 'music/AFTER  MILO J  AKIM 88 - NO ESTOY [Video Oficial].mp3'
    },
    {
        titulo: 'BICHIGYAL REMIX',
        nombre:' PRIZE, SAUTU, ARA, RAMMA, C N D, TIANO',
        ruta: 'music/BICHIGYAL REMIX - PRIZE, SAUTU, ARA, RAMMA, C N D, TIANO.mp3'
    },
    {
        titulo: 'Crazy',
        nombre:'Fazzini, Franky Style',
        ruta: 'music/Crazy.mp3'
    },
    {
        titulo: 'FEEL ME??',
        nombre:'Trueno',
        ruta: 'music/Trueno - FEEL ME__ (Video Oficial).mp3'
    }
];

let indiceCancionActual = 0;


function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].ruta;
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

function reproducirCancion(){
    cancion.play();
    iconoControl.classList.add('bi-pause-fill');
    iconoControl.classList.remove('bi-play-fill');

};

function pausarCancion(){
    cancion.pause();
    iconoControl.classList.add('bi-play-fill');    
    iconoControl.classList.remove('bi-pause-fill');
};

function reproducirPausar(){
    if (cancion.paused){
        reproducirCancion();
    } else{
        pausarCancion();
    }
};

cancion.addEventListener('timeupdate', function(){
    if (!cancion.paused){
        progreso.value = cancion.currentTime;
        actualizarColorBarraProgreso();
    }
});

cancion.addEventListener('ended', function(){
    siguienteCancion();
});

function siguienteCancion(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
}

function anteriorCancion(){
    indiceCancionActual = (indiceCancionActual -1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
}

function actualizarColorBarraProgreso() {
    const porcentaje = (progreso.value / progreso.max) * 100;
    progreso.style.background = `linear-gradient(to right, #A21B7E ${porcentaje}%, rgba(255, 255, 255, 0.2) ${porcentaje}%)`;
}


progreso.addEventListener('input',function(){
    cancion.currentTime = progreso.value;
});

progreso.addEventListener('change',function(){
    reproducirCancion();
});

btn_iniciar_pausar.addEventListener('click',reproducirPausar);

btn_siguiente.addEventListener('click',function(){
    siguienteCancion();
});

btn_atras.addEventListener('click', function(){
    anteriorCancion();
});

actualizarInfoCancion();