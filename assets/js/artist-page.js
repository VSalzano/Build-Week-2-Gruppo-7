const ARTIST_ENDPOINT =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/";

let addressBarContent = new URLSearchParams(window.location.search);
let artistId = addressBarContent.get("artistId");
let artistName = document.getElementById("artist-name");
let fans = document.getElementById("fans");
let heroImg = document.getElementById("hero-img");
let trackContainer = document.getElementById("track-container");
let favImg = document.getElementById("favorite-img");
let favBand = document.getElementById("favorite-band");

const converTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes} : ${formattedSeconds}`;
};

fetch(ARTIST_ENDPOINT + artistId)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("error fetching artist");
    }
  })
  .then((singleArtist) => {
    console.log(singleArtist);
    artistName.innerHTML = singleArtist.name;
    fans.innerHTML = singleArtist.nb_fan;
    heroImg.style.backgroundImage = `url("${singleArtist.picture_xl}")`;
    favBand.innerHTML = singleArtist.name;
    favImg.src = `${singleArtist.picture_small}`;
  })
  .catch((err) => {
    console.log(err);
  });

const POPULARS = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`;

fetch(POPULARS)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("error fetching artist");
    }
  })
  .then((popTracks) => {
    console.log(popTracks);

    let cont = 1;
    popTracks.data.forEach((track) => {
      let item = document.createElement("div");

      item.classList.add("d-flex", "mt-3", "ps-5");
      item.innerHTML = `
                <div class="col-1 text-secondary">${cont}</div>
                <div class="col-8">
                  <img class="pe-3"
                    style="height: 40px"
                    src="${track.album.cover_small}"
                    alt="album cover"
                  />
                ${track.title_short} ${track.title_version}
                </div>
                <div class="col-2 text-secondary">${track.rank}</div>
                <div class="col-1 text-secondary">${convertTime(
                  track.duration
                )}</div>
                `;
      trackContainer.appendChild(item);
      cont++;
    });
  })
  .catch((err) => {
    console.log(err);
  });
