const mainSearchBar = document.getElementById("main_searchBar");

const main_searchBarFunc = (allDataCardsRecette) => {
  mainSearchBar.addEventListener("input", function (e) {
    const valueSearch = e.target.value;
    const valuePrevLS = localStorage.getItem("valuePrev");

    // Stocker la valeur précédente pour vérifier le else If
    localStorage.setItem("valuePrev", valueSearch);

    if (valueSearch.trim().length >= 3) {
      const filteredBySearch = [];

      for (let i = 0; i < allDataCardsRecette.length; i++) {
        const item = allDataCardsRecette[i];
        let match = false;

        for (const [key, value] of Object.entries(item)) {
          if (
            (key === "name" || key === "description") &&
            value.toString().toLowerCase().includes(valueSearch.toLowerCase())
          ) {
            match = true;
            break;
          }

          if (key === "ingredients" && Array.isArray(value)) {
            for (const ingredient of value) {
              if (ingredient.ingredient.toString().toLowerCase().includes(valueSearch.toLowerCase())) {
                match = true;
                break;
              }
            }
          }
        }

        if (match) {
          filteredBySearch.push(item);
        }
      }

      // Supprimer les tags au saisi de la barre de recherche principale
      localStorage.removeItem("selectedTagsLS");
      initFilterRecipes_ByLocalStorageTags(filteredBySearch);
      displayCardRecetteData(filteredBySearch, "search");
    } else if (valuePrevLS && valuePrevLS.trim().length >= 3) {
      displayCardRecetteData(allDataCardsRecette, "search");
    }
  });
};
