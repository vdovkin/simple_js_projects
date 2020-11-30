const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play or pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play / Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="far fa-play-circle fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="far fa-pause-circle fa-2x"></i>';
  }
}

// Update progress & timestamp
function upadateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    min = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${min}:${secs}`;
}

// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", upadateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
