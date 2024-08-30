const audioPlayer = document.getElementById('audio-player');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress');
const currentTimeElement = document.querySelector('.current-time');
const totalTimeElement = document.querySelector('.total-time');
const songTitle = document.querySelector('.song-title');
const artistName = document.querySelector('.artist-name');

const songs = [
    {
        title: 'flow',
        artist: 'unknown',
        src: 'flow-211881.mp3',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        src: 'song2.mp3',
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        src: 'song3.mp3',
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    audioPlayer.load();
}

function playSong() {
    audioPlayer.play();
    playBtn.textContent = 'Pause';
}

function pauseSong() {
    audioPlayer.pause();
    playBtn.textContent = 'Play';
}

function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercentage = (currentTime / duration) * 100;

    progressBar.value = progressPercentage;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    totalTimeElement.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

progressBar.addEventListener('input', () => {
    const progress = progressBar.value;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progress / 100) * duration;
});

audioPlayer.addEventListener('timeupdate', updateProgress);

// Load the first song initially
loadSong(currentSongIndex);