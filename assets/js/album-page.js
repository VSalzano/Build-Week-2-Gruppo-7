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
      let item = document.createElement("div");
      item.classList.add(
        "row",
        "align-items-center",
        "px-4",
        "mt-3",
        "single-track"
      );

      item.innerHTML = `
    <div class="col-1">
        <p id="track-n" class="text-light my-0">${cont}</p>
    </div>
    <div class="col-6">
        <a href="#" class="text-light my-0 d-block">${track.title}</a>
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
  })
  .catch((err) => {
    console.log(err);
  });
