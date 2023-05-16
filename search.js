const renderSearchParameter = function (searched) {
  searched = searched.toLowerCase();
  searched = searched.trim();
  searched = searched.replace(/ /g, "_");
  return searched;
};

const searchAndLoad = function (searched) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searched}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("couldn't load the search");
      }
    })
    .then((searchedItems) => {
      console.log(searchedItems);
      let searchContainer = document.getElementById("search-container");
      let underSearchContainer = document.getElementById(
        "under-search-container"
      );
      searchContainer.innerHTML = "";
      underSearchContainer.innerHTML = "";

      let newSearchUl = document.createElement("ul");
      newSearchUl.classList.add("list-unstyled");
      searchContainer.appendChild(newSearchUl);

      searchedItems.data.forEach((item) => {
        let newli = document.createElement("li");
        newli.classList.add("mb-2");

        newli.innerHTML = `
        <div class="d-flex">
            <div class="me-2">
                <img src="${item.album.cover}" style="width: 50px;"/>
            </div>
            <div class="d-flex flex-column">
                <a class="text-light fw-bold text-decoration-none" href="album-page.html?albumId=${item.album.id}">${item.album.title}</a>
                <a class="text-light text-decoration-none" href="artist-page.html?artistId=${item.artist.id}">${item.artist.name}</a>
            </div>
        </div>
        `;
        newSearchUl.appendChild(newli);
      });
    })
    .catch((err) => {
      let searchContainer = document.getElementById("search-container");
      let underSearchContainer = document.getElementById(
        "under-search-container"
      );

      searchContainer.innerHTML = `
      <p>la tua ricerca non è andata a buon fine prova qualcos'altro</p>`;
      underSearchContainer.innerHTML = "";
      console.log(err);
    });
};

const formHandler = function () {
  let mainForm = document.getElementById("search-form");
  let searched = document.querySelector("#search-form input");

  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formattedSearch = renderSearchParameter(searched.value);
    searchAndLoad(formattedSearch);
  });
};

window.onload = () => {
  formHandler();
};
