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

function convertTime(seconds) {
 let minutes = Math.floor(seconds / 60);
 let remainingSeconds = seconds % 60;
 let formattedSeconds =
  remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
 return `${minutes} : ${formattedSeconds}`;
}

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

   item.classList.add(
    "d-flex",
    "my-2",
    "ps-3",
    "ps-lg-5",
    "flex-wrap",
    "align-items-center"
   );
   item.innerHTML = `
                <div class="col-1 text-secondary">${cont}</div>
                <div class="col-10 d-flex align-items-center">
                  <div>
                    <img class="pe-3"
                      style="height: 50px"
                      src="${track.album.cover_small}"
                      alt="album cover"
                    />
                  </div>
                  <div class="d-flex flex-wrap flex-grow-1">
                    <div class="col-12 col-lg-10">${track.title_short} ${
    track.title_version
   }
                    </div>
                    <div class="col-12 col-lg-2 text-secondary">${track.rank}
                    </div>
                  </div>                    
                  </div>
                </div>
                <div class="d-none d-lg-block col-1 text-secondary">${convertTime(
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
