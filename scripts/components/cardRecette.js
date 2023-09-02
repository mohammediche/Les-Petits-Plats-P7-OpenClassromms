const getCardRecetteData = async () => {
  try {
    const response = await fetch("./public/data/recipes.json");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error to get cards recette=>", error);
  }
};
const displayCardRecetteData = (allDataCardsRecette, status = "init") => {
  const allCardsRecette = document.querySelector(".allCardsRecette");
  const valuePrev = localStorage.getItem("valuePrev");

  // Supprimer les éléments existants
  allCardsRecette.innerHTML = "";
  // Créez un nouveau div
  const total_recipes_div = document.createElement("div");
  total_recipes_div.className = "total_recipes";
  total_recipes_div.textContent = `
    ${allDataCardsRecette.length < 10 ? "0" : ""}${allDataCardsRecette.length} recette${
    allDataCardsRecette.length > 1 ? "s" : ""
  }
  `;

  // Insérez le nouveau div à la première position
  allCardsRecette.insertBefore(total_recipes_div, allCardsRecette.firstChild);

  if (allDataCardsRecette.length <= 0) {
    allCardsRecette.textContent = `Aucune recette ne contient ’${valuePrev}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
  } else {
    allDataCardsRecette.forEach((dataCardRecette) => {
      const { id, appliance, description, image, ingredients, name, servings, time, ustensils } = dataCardRecette;
      const cardRecette = cardRecetteFactory(description, image, ingredients, name, time);
      // Récupération du template de la carte de recette en appelant "getCardRecetteDOM()"
      const templateCardRecette = cardRecette.getCardRecetteDOM();
      // Affichage des données dans la balise html <article> qui a la class "cardsRecette"
      allCardsRecette.appendChild(templateCardRecette);
    });

    if (status === "search") {
      updateFilteredDropDownData(allDataCardsRecette);
      sortRecipesByCategory(allDataCardsRecette);
    }
  }
};

// Initialisation de l'application
const init = async () => {
  const allDataCardsRecette = await getCardRecetteData();
  displayCardRecetteData(allDataCardsRecette);
  displayDropDownData(allDataCardsRecette);
  main_searchBarFunc(allDataCardsRecette);
  sortRecipesByCategory(allDataCardsRecette);
  initFilterRecipes_ByLocalStorageTags(allDataCardsRecette);
};
init();
