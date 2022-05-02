let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');


let track_list = [
  {
    name: "The Night We Met",
    artist: "Lord Huron",
    image: "https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "https://fine.sunproxy.net/file/SlB1Y3NtcC9mRUd4aERva2lkaWUrNElUSGh1elQ1TEZ1WjJ3amoyYkJjVmMydFoxZFJMRFZTOHMvSEpqNENrRDc0N2EvVzNLN3NjdUJQMFpvQ24vUml5WUh5bkNadHJmZkFZTlRUZE5XVkU9/Lord_Huron_-_The_Night_We_Met_(ColdMP3.com).mp3"
  },
  {
    name: "My Heart Will Go On",
    artist: "Celine Dion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00-iCWQQz4YmFdCT0hXtLJSzqL8cuSWVYNqS9AyBy4PBOJ3DhjHUSdwAOLwcJ6rqrGQw&usqp=CAU",
    path: "https://raagjatt.net/songsm/128/6303/My%20Heart%20Will%20Go%20On%20(RaagJatt.com).mp3"
  },
  {
    name: "Heat Waves",
    artist: "Glass Animals",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkQnPtAsJfDNqzv4-eZjcij436yalOFyPG3HHW1Oy1nbWfmaPANI3Ct7-sQ6oNGF9imvo&usqp=CAU",
    path: "https://pagaliworld.com/files/download/id/4353"
  },
  {
    name: "Back To You",
    artist: "Alycia Marie",
    image: "https://images.pexels.com/photos/1535972/pexels-photo-1535972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    path: "https://pwdown.com/14458/Back%20To%20U%20English%20-%20Tik%20Tok.mp3"
  },
];

function random_bg_color() {


  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

 
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

