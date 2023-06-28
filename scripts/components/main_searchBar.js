const mainSearchBar = document.getElementById("main_searchBar");

const main_searchBarFunc = (allDataCardsRecette) => {
  mainSearchBar.addEventListener("input", (e) => {
    const valueSearch = e.target.value;
    const valuePrevLS = localStorage.getItem("valuePrev");
    // on stock la valeur précédente pour vérifier le else If
    localStorage.setItem("valuePrev", valueSearch);
    if (valueSearch.trim().length >= 3) {
      const filteredBySearch = allDataCardsRecette?.filter((item) => {
        return Object.entries(item).some(([keys, value]) => {
          if (keys === "name" || keys === "description") {
            return value.toString().toLowerCase().includes(valueSearch.toLowerCase());
          }
          if (keys === "ingredients" && Array.isArray(value)) {
            return value.some((ingredient) => {
              return ingredient.ingredient.toString().toLowerCase().includes(valueSearch.toLowerCase());
            });
          }
        });
        // return Object.values(item).some((value) => value.toString().toLowerCase().includes(valueSearch.toLowerCase()));
      });
      displayCardRecetteData(filteredBySearch, "search");
    } else if (valuePrevLS && valuePrevLS.trim().length >= 3) {
      displayCardRecetteData(allDataCardsRecette, "search");
    }
  });
};
