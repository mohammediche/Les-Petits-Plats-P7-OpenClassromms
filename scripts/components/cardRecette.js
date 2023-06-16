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

  // Supprimer les éléments existants
  allCardsRecette.innerHTML = "";

  allDataCardsRecette.forEach((dataCardRecette) => {
    const { id, appliance, description, image, ingredients, name, servings, time, ustensils } = dataCardRecette;
    const cardRecette = cardRecetteFactory(description, image, ingredients, name, time);
    // Récupération du template de la carte de recette en appelant "getCardRecetteDOM()"
    const templateCardRecette = cardRecette.getCardRecetteDOM();
    // Affichage des données dans la balise html <article> qui a la class "cardsRecette"
    allCardsRecette.appendChild(templateCardRecette);
  });

  // Appel de la fonction pour exécuter handleDropDown.js après avoir terminé l'affichage des données
  runHandleDropDown();
  // Appelle displayDropDownData avec le nouveau tableau filtré
  displayDropDownData(allDataCardsRecette);
};
const runHandleDropDown = () => {
  // Vérifiez ici que cardRecette.js a terminé son exécution et que les éléments requis sont disponibles
  if (
    document.querySelectorAll(".dropdown-container").length > 0 &&
    document.querySelectorAll(".dropdown-menu").length > 0
  ) {
    // Appel du fichier handleDropDown.js
    handleDropDown();
  } else {
    // Attendre un court instant et réessayer
    setTimeout(runHandleDropDown, 100);
  }
};

const displayDropDownData = (allData) => {
  const allDropdowns = document.querySelector(".all-dropdowns");
  const setDataIngredients = new Set();
  const setDataUstensils = new Set();
  const setDataAppliance = new Set();

  allData.forEach((data) => {
    // ce code permet de stocker dans setData, tout les noms d'ingrédients avec la vérifications pour ne pas avoir de doublant / des ingrédients déja existants dans setDataIngredients
    data.ingredients.flatMap((ingredient) => setDataIngredients.add(ingredient.ingredient));
    // ustensils
    data.ustensils.flatMap((ustensil) => setDataUstensils.add(ustensil));
    // appliance
    setDataAppliance.add(data.appliance);
  });

  const dropDownModel = dropDownFactorie([...setDataIngredients], [...setDataUstensils], [...setDataAppliance]);
  const templateIngredients = dropDownModel.getIngredientsDom();
  const templateUstensils = dropDownModel.getUstensilsDom();
  const templateAppliance = dropDownModel.getApplianceDom();
  // affichage des templates dropdDowns dans la section all-dropdowns
  allDropdowns.innerHTML = "";
  allDropdowns.appendChild(templateIngredients);
  allDropdowns.appendChild(templateUstensils);
  allDropdowns.appendChild(templateAppliance);
  // appreilsFactorie([...setDataUstensils]);
};

// Initialisation de l'application
const init = async () => {
  const allDataCardsRecette = await getCardRecetteData();
  displayCardRecetteData(allDataCardsRecette);
  displayDropDownData(allDataCardsRecette);
  main_searchBarFunc(allDataCardsRecette);
};
init();
