const ENDPOINT =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";
let header = document.getElementById("main");
let featured = document.getElementById("featured");

fetch(ENDPOINT)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching album");
    }
  })
  .then((albums) => {
    console.log(albums.data);
    let currentAlbum = document.createElement("div");
    currentAlbum.innerHTML = `
    <div class="d-flex">
    <div>
        <img
        class="p-0 me-3"
        src="${albums.data[3].album.cover_medium}"        
                  alt="album cover"
                />
              </div>
              <div>
                <p class="p-0 m-0 fs-6 mb-2">ALBUM</p>
                <div>
                  <h1 class="fs-1"><a href="#">${albums.data[3].album.title}</a></h1>
                </div>

                <a href="./artist-page.html?artistId=${albums.data[3].artist.id}">${albums.data[3].artist.name}</a>


                <div class="d-flex align-items-center">
                  <button
                    class="btn me-5 bg-success rounded-pill ps-4 pe-4"
                    type="submit"
                  >
                    Play
                  </button>

                  <button
                    class="btn me-5 rounded-pill ps-4 pe-4 text-white border-secondary"
                    type="submit"
                  >
                    Salva
                  </button>

                  <i class="fa-sharp fa-solid fa-ellipsis fs-4"></i>
                </div>
    </div>
    </div>
    `;

    header.appendChild(currentAlbum);

    function getRandomElements(array, numElements) {
      const shuffledArray = array.slice();

      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }

      return shuffledArray.slice(0, numElements);
    }

    const randomAlbums = getRandomElements(albums.data, 6);
    console.log(randomAlbums);

    randomAlbums.forEach((randomAlbum) => {
      let col = document.createElement("div");
      col.classList.add("col-sm-6", "col-xl-4");
      col.innerHTML = `

        <div class="d-flex bg-black align-items-center">
          <div class="me-3">
            <img
              src="${randomAlbum.album.cover_small}"
              alt=""
            />
          </div>

          <div>
            <a href="#">${randomAlbum.album.title}</a>
          </div>
        </div>

        `;

      featured.appendChild(col);
    });
  })
  .catch((err) => {
    console.log(err);
  });
