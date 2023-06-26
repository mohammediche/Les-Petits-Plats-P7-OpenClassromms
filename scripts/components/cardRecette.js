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

  if (status === "search") {
    updateFilteredDropDownData(allDataCardsRecette);
  }
};

const updateFilteredDropDownData = (filteredData) => {
  const setDataIngredients = new Set();
  const setDataUstensils = new Set();
  const setDataAppliance = new Set();
  filteredData.forEach((data) => {
    // ce code permet de stocker dans setData, tout les noms d'ingrédients avec la vérifications pour ne pas avoir de doublant / des ingrédients déja existants dans setDataIngredients
    data.ingredients.flatMap((ingredient) => setDataIngredients.add(ingredient.ingredient));
    // ustensils
    data.ustensils.flatMap((ustensil) => setDataUstensils.add(ustensil));
    // appliance
    setDataAppliance.add(data.appliance);
  });
  updateDataList("ingredients", [...setDataIngredients]);
  updateDataList("ustensils", [...setDataUstensils]);
  updateDataList("appliance", [...setDataAppliance]);
};

function enleverMajusculesAccents(id) {
  // Supprimer les accents
  const idSansAccents = id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertir en minuscules
  const idEnMinuscules = idSansAccents.toLowerCase();

  return idEnMinuscules;
}

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

  const dropDownModel = dropDownFactorie();
  // faire les noms des categories, en tout minuscule et sans accesent, et les passer en 3eme param pour pouvoir la passer ensuite en tant qu'id à la fonction displayDataList
  const idIngredientsList = enleverMajusculesAccents("Ingrédients");
  const idUstensilsList = enleverMajusculesAccents("Ustensils");
  const idApplianceList = enleverMajusculesAccents("Appliance");

  const templateIngredients = dropDownModel.getDropDownsDom([...setDataIngredients], "Ingrédients", idIngredientsList);
  const templateUstensils = dropDownModel.getDropDownsDom([...setDataUstensils], "Ustensils", idUstensilsList);
  const templateAppliance = dropDownModel.getDropDownsDom([...setDataAppliance], "Appliance", idApplianceList);
  // affichage des templates dropdDowns dans la section all-dropdowns
  // allDropdowns.innerHTML = "";
  allDropdowns.appendChild(templateIngredients);
  allDropdowns.appendChild(templateUstensils);
  allDropdowns.appendChild(templateAppliance);
  // appreilsFactorie([...setDataUstensils]);
};

const updateDataList = (idUl, dataLi) => {
  const myListDropDown = document.querySelector(`#${idUl}`);
  myListDropDown.innerHTML = "";
  for (let index = 0; index < dataLi.length; index++) {
    const li = document.createElement("li");
    li.textContent = dataLi[index];
    myListDropDown.appendChild(li);
  }
};

// Initialisation de l'application
const init = async () => {
  const allDataCardsRecette = await getCardRecetteData();
  displayCardRecetteData(allDataCardsRecette);
  displayDropDownData(allDataCardsRecette);
  main_searchBarFunc(allDataCardsRecette);
};
init();
