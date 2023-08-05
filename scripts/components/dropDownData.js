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

function enleverMajusculesAccents(id) {
  // Supprimer les accents
  const idSansAccents = id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertir en minuscules
  const idEnMinuscules = idSansAccents.toLowerCase();

  return idEnMinuscules;
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
  // console.log("dataLi", dataLi);
  const myListDropDown = document.querySelector(`#${idUl}`);
  myListDropDown.innerHTML = "";
  for (let index = 0; index < dataLi.length; index++) {
    const li = document.createElement("li");
    li.textContent = dataLi[index];
    myListDropDown.appendChild(li);
  }
};
