const music = document.querySelector("audio");
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

//Check if playing
let isPlaying = false;

//play
function playSong(){
    music.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

//pause
function pauseSong(){
    music.pause();
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
}

//play or pause

playBtn.addEventListener('click',()=>{
    isPlaying? pauseSong() : playSong();
})