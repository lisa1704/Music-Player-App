const musicContainer = document.getElementById('container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('music-title');
const cover = document.getElementById('cover');

//song titles
const songs = ['Beautiful People','Highway to Hell','London Boy','Man on a Wire'];

//keep track of songs
let songIndex =2;

//load song to DOM

loadSong(songs[songIndex]);

//update song details
function loadSong(song){
    title.innerText = song;
    audio.src= `music/${song}.mp3`;
    cover.src= `images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong(){
  songIndex--
  if(songIndex<0){
      songIndex=songs.length-1
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
    songIndex++
    if(songIndex> songs.length-1){
        songIndex=0;
    }
  
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(event){
  //console.log(event.srcElement.currentTime);
  const {duration, currentTime} = event.srcElement;
  const progressPercent = (currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(event){
  const width = this.clientWidth; // total width by the song
  //console.log(width);
  const clickX = event.offsetX; //user click on progress bar
  //console.log(clickX);
  const duration = audio.duration; //total duration of song

  audio.currentTime = (clickX/width)*duration ; 
}

playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate', updateProgress );

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);


