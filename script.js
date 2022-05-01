

const image = document.querySelector('img')
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector("audio");
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const currentDuration = document.getElementById('duration');
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

//update Progress Bar and time
function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;

        //Update Progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        //calculate displat for duration
        const durationMinutes = parseInt(duration/60);
        const durationSeconds = parseInt(duration%60);
        let durationText = '00:00';
        if (durationSeconds<10){
            durationText = `${durationMinutes}:0${durationSeconds}`
        }else{
            durationText = `${durationMinutes}:${durationSeconds}`
        }
        
        //Evoid NaN
        if (durationMinutes){
            currentDuration.textContent = durationText;
        }

        //calculate displat for current time
        const currentMinutes = parseInt(currentTime/60);
        const currentSeconds = parseInt(currentTime%60);
        let currenttText = '00:00';
        if (currentSeconds<10){
            currenttText = `${currentMinutes}:0${currentSeconds}`
        }else{
            currenttText = `${currentMinutes}:${currentSeconds}`
        }

        //Evoid NaN
        if (currentSeconds){
            currentTimeEl.textContent = currenttText;
        }
    }
}

//set Progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const progressPercent = clickX/width;
    const {duration} = music;
    const currentMinutes = Math.floor(duration*progressPercent/60);
    const currentSeconds = Math.floor((duration*progressPercent)%60);
    let currenttText = '00:00';
    if (currentSeconds<10){
        currenttText = `${currentMinutes}:0${currentSeconds}`
    }else{
        currenttText = `${currentMinutes}:${currentSeconds}`
    }

    //Update Progress bar width
    progress.style.width = `${progressPercent *100}%`;
    music.currentTime = progressPercent *duration;
    currentTimeEl.textContent = currenttText;
}

//event Listener

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);

