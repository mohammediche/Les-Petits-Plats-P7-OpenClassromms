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
  myListDropDown.innerHTML = "";
  for (let index = 0; index < dataLi.length; index++) {
    const li = document.createElement("li");
    li.textContent = dataLi[index];
    myListDropDown.appendChild(li);
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
      // ceci est pour le cas de appliance
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
      // on met à jour nos listes ul des dropDowns
      updateFilteredDropDownData(newDataRecipes);

      // on stocke les élements cliqué dans LocalStorage
      let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTags")) || [];
      selectedTagsLS.push(item.textContent);
      localStorage.setItem("selectedTags", JSON.stringify(selectedTagsLS));
      // on rappelle la fonction actuel en elle-meme, pour pouvoir accéder au clique aux nouvelles données du dropDown génére par updateFilteredDropDownData
      sortRecipesByCategory(newDataRecipes);
      getTags();
    });

    handleselectedTagsLS(item);
  });
};

const handleselectedTagsLS = (item) => {
  let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTags")) || [];

  if (selectedTagsLS.includes(item.textContent)) {
    item.style.backgroundColor = "#FFD15B";
  }
};
