const updateUlList = (allData) => {
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
  return { setDataIngredients, setDataUstensils, setDataAppliance };
};

const updateFilteredDropDownData = (filteredData) => {
  const { setDataIngredients, setDataUstensils, setDataAppliance } = updateUlList(filteredData);
  updateDataList("ingredients", [...setDataIngredients]);
  updateDataList("ustensils", [...setDataUstensils]);
  updateDataList("appliance", [...setDataAppliance]);
};

function enleverMajusculesAccents(text) {
  // Supprimer les accents
  const textSansAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertir en minuscules
  const textEnMinuscules = textSansAccents.toLowerCase();

  return textEnMinuscules;
}

const displayDropDownData = (allData) => {
  const allDropdowns = document.querySelector(".all-dropdowns");
  const { setDataIngredients, setDataUstensils, setDataAppliance } = updateUlList(allData);

  const dropDownModel = dropDownFactorie();
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
  let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTagsLS")) || [];

  myListDropDown.innerHTML = "";
  for (let index = 0; index < dataLi.length; index++) {
    const li = document.createElement("li");
    li.textContent = dataLi[index];
    myListDropDown.appendChild(li);
    // mettre un backgroundColor orange pour les élements sélectionnés
    selectedTagsLS.forEach((val) => {
      const keys = Object.keys(val)[0];
      const items = val[keys];
      if (items.includes(li.textContent)) {
        li.style.backgroundColor = "#FFD15B";
      }
    });
  }
};
// trier ma data recettes au clique sur les élements du dropDown des catégories
const sortRecipesByCategory = (allDataCardsRecette) => {
  // const listItems = Array.from(myList.getElementsByTagName("li"));
  const listItems = document.querySelectorAll(".dropdown-menu li");
  // click
  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const idListUl = e.target.parentNode.id;
      const itemTarget = e.target.textContent;
      let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTagsLS")) || [];
      // Vérifier si l'élément cliqué est déjà présent dans selectedTagsLS
      const isItemAlreadySelected = selectedTagsLS.some(
        (selectedItem) => selectedItem.hasOwnProperty(idListUl) && selectedItem[idListUl].includes(itemTarget)
      );
      // Si l'élément est déjà sélectionné, retournez sans rien faire
      if (isItemAlreadySelected) {
        return;
      }

      const newDataRecipes = allDataCardsRecette.filter((recipe) => {
        // if id === appliance
        if (idListUl === "ingredients") {
          return recipe.ingredients.some((ingredient) => ingredient.ingredient === itemTarget);
        } else if (idListUl === "ustensils") {
          return recipe.ustensils.some((ustensil) => ustensil === itemTarget);
        } else if (idListUl === "appliance") {
          return recipe.appliance === itemTarget;
        } else {
          console.log("else");
          return;
        }
      });
      // on met à jour la listes des recettes avec le nouveau tableau
      displayCardRecetteData(newDataRecipes);

      // Recherche de l'index correspondant à idListUl dans le tableau
      const index = selectedTagsLS.findIndex((item) => item.hasOwnProperty(idListUl));

      if (index !== -1) {
        // Si idListUl existe déjà dans le tableau, ajoute l'élément à son tableau d'éléments
        selectedTagsLS[index][idListUl].push(item.textContent);
      } else {
        // Sinon, crée un nouvel objet avec idListUl comme propriété et l'élément cliqué dans un tableau
        const newObj = { [idListUl]: [item.textContent] };
        selectedTagsLS.push(newObj);
      }

      localStorage.setItem("selectedTagsLS", JSON.stringify(selectedTagsLS));
      // on met à jour nos listes ul des dropDowns
      updateFilteredDropDownData(newDataRecipes);

      // on rappelle la fonction actuel en elle-meme, pour pouvoir accéder au clique aux nouvelles données du dropDown génére par updateFilteredDropDownData
      sortRecipesByCategory(newDataRecipes);
      // afficher les tags
      getTags();
    });
  });
};

// Suppression des tags :
/* Supprimer les tags du LS, et rappeler la fonction F1 pour refiltrer les recettes selon les tags actifs */

const initFilterRecipes_ByLocalStorageTags = (allDataCardsRecette) => {
  // Filtrer les données de recettes en fonction des éléments stockés dans le LocalStorage
  let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTagsLS")) || [];
  // Créer un tableau pour stocker les recettes correspondantes à tous les éléments du LocalStorage
  let newDataRecipes = allDataCardsRecette;

  selectedTagsLS.forEach((val) => {
    const keys = Object.keys(val)[0];
    const items = val[keys];

    newDataRecipes = newDataRecipes.filter((recipe) => {
      if (keys === "ingredients") {
        return items.every((item) => recipe.ingredients.some((ingredient) => ingredient.ingredient === item));
      } else if (keys === "ustensils") {
        return items.every((item) => recipe.ustensils.includes(item));
      } else if (keys === "appliance") {
        return items.includes(recipe.appliance);
      }
      return true;
    });
  });
  // Mettre à jour la liste des recettes avec le nouveau tableau
  displayCardRecetteData(newDataRecipes);

  // Mettre à jour les listes ul des dropDowns
  updateFilteredDropDownData(newDataRecipes);

  sortRecipesByCategory(newDataRecipes);
  // Afficher les tags
  getTags();
};
