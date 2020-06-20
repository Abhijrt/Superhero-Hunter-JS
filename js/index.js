const Main = (function () {
  const btn = document.getElementById('btn');
  
  const loader = document.querySelector('.loader');
  const searchList = document.getElementById('search-results-list');
  let searchResults = [];
  const FAVOURITES = 'favourites';
  function showLoader(){
    loader.style.display = 'block';
  }

  /* Get fav superheroes from the local storage */
  function getFavouriteSuperheroes() {
    console.log("getFavourateSuperhero");
    return localStorage.getItem(FAVOURITES)
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : [];
  }

  function renderSearchResults() {
    // If data is empty warn the user
    if (!searchResults || searchResults.length === 0) {
      searchList.innerHTML = '<li class="no-results">No results found!</li>';
      console.log("no result");
      return;
    }
    console.log("render Search Result");
    const favSuperHeroes = getFavouriteSuperheroes();
    searchList.innerHTML = '';
    // Append each search result in the list
    searchResults.forEach((element) => {
      const li = document.createElement('li');
      // Find if superhero exists in favourites
      const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
        (hero) => hero.id === element.id
      );
      li.classList.add('search-result');
      li.innerHTML = `
                    <div class="search-left">
                      <img src=${element.image.url} alt="" />
                    </div>
                    <div class="search-right">
                      <a href="superhero.html?id=${element.id}">
                        <div class="name">${element.name}</div>
                      </a>
                      <div class="full-name">${
                        element.biography['full-name']
                      }</div>

                      <div class="address">${
                        element.biography['place-of-birth']
                      }</div>
                      <button class="btn add-to-fav" data-id=${
                        element.id
                      } style="display: ${
        indexOfSuperHeroInFavourites === -1 ? 'block' : 'none'
      }">Add to favourites</button>
                      <button class="btn remove-from-fav" data-id=${
                        element.id
                      }  style="display: ${
        indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'
      }">Remove from favourites</button>
                    </div>
                  `;
      searchList.appendChild(li);
    });
  }

  /* Add hero to localstorage */
  function addHeroToFavourites(hero) {
    console.log("addHEroToFavourite");
    if (!hero) return;

    const favouritesFromLocalStorage = getFavouriteSuperheroes();
    favouritesFromLocalStorage.push(hero);

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

  }

  function handleSearch(e){
    console.log("i am in handle search");
    // fetching the data
      e.preventDefault();
      const name = $('#search').val();
      // var name = input.val();
      console.log(name);
      if(name === ""){
        alert("Please write the name of the Superhero");
        return;
      }
      const apiToken = '3020730558155270';
      const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/search/${name}`;
      // showLoader();
      $.get(apiUrl,function(data){
        console.log(data);
          searchResults = data.results;
          console.log("Hii",searchResults);
          renderSearchResults();
        // }
      });
  }

  
   /* Remove hero from localstorage */
   function removeHeroFromFavourites(heroId) {
    console.log("removeHeroFromFavourite");
    if (!heroId) return;

    let favouritesFromLocalStorage = getFavouriteSuperheroes();

    // Remove hero from localstorage
    favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
      (item) => item.id !== heroId
    );

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

  }

  function handleDocumentClick(e){
    const target = e.target;

    if (target.classList.contains('add-to-fav')) {
      console.log("first if");
      // Find the hero data and store it in favourites and localstorage
      const searchResultClickedId = target.dataset.id;
      const hero = searchResults.filter(
        (hero) => hero.id === searchResultClickedId
      );
      addHeroToFavourites(hero[0]);
      renderSearchResults();
    } else if (target.classList.contains('remove-from-fav')) {
      console.log("second if");
      // Find the hero data and remove from local storage
      const searchResultClickedId = target.dataset.id;

      // Show add to fav button and hide the remove from fav button
      const addToFavBtn = document.querySelector(
        `button[data-id="${searchResultClickedId}"].add-to-fav`
      );
      if (addToFavBtn) addToFavBtn.style.display = 'block';

      const removeFromFavBtn = document.querySelector(
        `button[data-id="${searchResultClickedId}"].remove-from-fav`
      );
      if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';

      removeHeroFromFavourites(searchResultClickedId);
    }
  }

  function init(){
    console.log("I Am in init");
    btn.addEventListener('click',handleSearch);
    document.addEventListener('click',handleDocumentClick);
  }

  

  return {
    init,
    getFavouriteSuperheroes,
    removeHeroFromFavourites
  };
})();


