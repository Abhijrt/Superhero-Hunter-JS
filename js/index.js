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

  function init(){
    console.log("I Am in init");
    btn.addEventListener('click',handleSearch);
  }

  

  return {
    init,
  };
})();


