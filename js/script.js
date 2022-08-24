const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".img-area img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex); // calling load music function once window loads
});

// loads music function
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jfif`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// playMusic function
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// pauseMusic function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  // if isMusicPaused is true, then call pauseMusic eslse playMusic
  isMusicPaused ? pauseMusic() : playMusic;
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

// update current music with progress bar
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = document.querySelector(".current");
  let musicDuration = document.querySelector(".duration");
  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
  playMusic();
});
