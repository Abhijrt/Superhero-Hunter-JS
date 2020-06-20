const Favourites = (function () {
  const searchList = document.getElementById('search-results-list');

  function renderFavourites() {
    const favouritesData = Main.getFavouriteSuperheroes();

    // First empty the list
    searchList.innerHTML = '';

    if (!favouritesData || favouritesData.length === 0) {
      searchList.innerHTML = '<li>No results found!</li>';
    } else {
      favouritesData.forEach((element) => {
        const li = document.createElement('li');
        li.classList.add('search-result');
        li.innerHTML = `
                    <div class="search-left">
                      <img src=${element.image.url} alt="" />
                    </div>
                    <div class="search-right">
                      <a href="superhero.html?id=${element.id}">
                        <div class="name">${element.name}</div>
                      </a>
                      <div class="full-name">${element.biography['full-name']}</div>

                      <div class="address">${element.biography['place-of-birth']}</div>
                      <button class="btn remove-from-fav" data-id=${element.id}>Remove from favourites</button>
                    </div>
                  `;
        searchList.appendChild(li);
      });
    }

    // Common.hideLoader();
    return;
  }

  function init() {
    renderFavourites();
    const remove = document.getElementsByClassName('remove-from-fav');
    for(let i=0;i<remove.length;i++){
      remove[i].addEventListener('click',function(){
        renderFavourites();
      });
    }
  }
  return{
    init,
  };
})();