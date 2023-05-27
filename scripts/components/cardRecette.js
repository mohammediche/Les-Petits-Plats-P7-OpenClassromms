const getCardRecetteData = async () => {
  try {
    const response = await fetch("./public/data/recipes.json");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error to get cards recette=>", error);
  }
};
const displayCardRecetteData = (allDataCardsRecette) => {
  const allCardsRecette = document.querySelector(".allCardsRecette");
  allDataCardsRecette.forEach((dataCardRecette) => {
    const cardRecette = cardRecetteFactory(dataCardRecette);
    // Récupération du template de la carte de recette en appelant "getCardRecetteDOM()"
    const templateCardRecette = cardRecette.getCardRecetteDOM();
    console.log("dataCardRecette", dataCardRecette);
    // Affichage des données dans la balise html <article> qui a la class "cardsRecette"
    allCardsRecette.appendChild(templateCardRecette);
  });
};

// Initialisation de l'application
const init = async () => {
  const allDataCardsRecette = await getCardRecetteData();
  displayCardRecetteData(allDataCardsRecette);
};
init();
