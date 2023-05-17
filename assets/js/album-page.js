const ALBUM_ENDPOINT =
  "https://striveschool-api.herokuapp.com/api/deezer/album/";

let addressBarContent = new URLSearchParams(window.location.search);
let albumId = addressBarContent.get("albumId");
let albumTitle = document.getElementById("album-title");
let albumCover = document.getElementById("album-cover");
let artistName = document.getElementById("artist-name");
let year = document.getElementById("year");
let tracks = document.getElementById("tracks");
let albumDuration = document.getElementById("album-duration");
let trackList = document.getElementById("track-list");

const startMusic = function (albums) {
  let songsFields = document.querySelectorAll(".play-me");
  let audio = false;
  let play;
  for (let i = 0; i < songsFields.length; i++) {
    audio = false;
    songsFields[i].addEventListener("click", () => {
      console.dir(songsFields[i]);
      let fileAudio = songsFields[i].dataset.effettoAudio;
      console.log(fileAudio);
      audio = new Audio(fileAudio);
      console.dir(audio);
      // audio.play();
      audio.buttonRefernce = document.getElementById("play-btn");

      audio.buttonRefernce.addEventListener("click", () => {
        if (play) {
          audio.pause();
          play = false;
        } else {
          audio.play();
          play = true;
        }
      });
    });
  }
};

const playButton = function () {
  let playButton = document.getElementById("play-btn");
  let onplay;

  playButton.addEventListener("click", () => {
    if (onplay) {
      playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" fill="currentColor" class="mx-1">
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
        </svg> `;
      onplay = false;
    } else {
      playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" fill="currentColor" class="mx-1">
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
        </svg>`;
      onplay = true;
    }
  });
};

const player = function (albums) {
  let songsFields = document.querySelectorAll(".play-me");
  let coverOnPlay = document.getElementById("cover-onplay");
  let titleOnPlay = document.getElementById("title-onplay");
  let artistOnPlay = document.getElementById("artist-onplay");

  for (let i = 0; i < songsFields.length; i++) {
    songsFields[i].addEventListener("click", () => {
      console.log(albums);
      console.dir(coverOnPlay);
      coverOnPlay.src = albums.cover;
      titleOnPlay.innerText = albums.tracks.data[i].title;
      console.log(albums.tracks.data[i].title);
      artistOnPlay.innerText = albums.artist.name;
    });
  }
};

const convertTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes} mins ${formattedSeconds} sec`;
};

const trackTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes} : ${formattedSeconds}`;
};

fetch(ALBUM_ENDPOINT + albumId)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("ERROR FETCHING ALBUM");
    }
  })
  .then((singleAlbum) => {
    console.log(singleAlbum);
    albumTitle.innerHTML = singleAlbum.title;
    albumCover.src = `${singleAlbum.cover_medium}`;
    artistName.innerHTML = singleAlbum.artist.name;
    year.innerHTML = singleAlbum.release_date;
    tracks.innerHTML = singleAlbum.nb_tracks;
    albumDuration.innerHTML = convertTime(singleAlbum.duration);

    cont = 1;

    singleAlbum.tracks.data.forEach((track) => {
      console.log(track);
      let item = document.createElement("div");
      item.classList.add("row", "align-items-center", "px-4", "mt-3");
      item.innerHTML = `
    <div class="col-1">
        <p class="text-light my-0">${cont}</p>
    </div>
    <div class="col-6">
        <div data-effetto-audio="${
          track.preview
        }" class="text-light my-0 d-block play-me">
            ${track.title}
        </div>
        <a href="./artist-page.html?artistId=${
          track.artist.id
        }" class="text-light my-0 d-block">${track.artist.name}</a>
    </div>
    <div class="col-3">
        <p class="text-light text-center my-0">${track.rank}</p>
    </div>
    <div class="col-2">
        <p class="text-light text-center my-0">${trackTime(track.duration)}</p>
    </div>
    `;
      trackList.appendChild(item);
      cont++;
    });
    return singleAlbum;
  })
  .then((album) => {
    console.log(album);
    startMusic(album);
    player(album);
  })
  .catch((err) => {
    console.log(err);
  });

window.onload = () => {
  playButton();
};
