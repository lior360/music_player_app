

const image = document.querySelector('img')
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector("audio");
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

//music
const songs=[
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Front Row',
        artist: 'Jacinto Design'
    }
];

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

//update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist ;
    music.src =`music/${song.name}.mp3`;
    image.src= `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//Previous song
function prevSong(){
    songIndex --;
    if (songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


//next song
function nextSong(){
    songIndex = (songIndex+1)%(songs.length);
    loadSong(songs[songIndex]);
    playSong();
}

//On Load
loadSong(songs[songIndex]);


//event Listener

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);