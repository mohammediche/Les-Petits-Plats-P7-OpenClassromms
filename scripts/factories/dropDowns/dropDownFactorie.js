const dropDownFactorie = (ingredients, ustensils, appliance) => {
  const getIngredientsDom = () => {
    const dropdown_ingredients = document.createElement("div");
    dropdown_ingredients.classList.add("dropdown-container");

    let template = `
    <div class="dropdown-toggle">Ingrédients</div>
    <div class="dropdown-menu">
      <div class="searchBar_categorie">
       <input class="search_input_categorie" type="search" />
        <div class="iconSearchBar_categorie">
            <i class="fas fa-search"></i>
        </div>
      </div>
      <ul>
        ${ingredients
          .map((name) => {
            return `<li>${name}</li>`;
          })
          .join("")}
      </ul>
    </div>
  `;
    dropdown_ingredients.innerHTML = template;
    return dropdown_ingredients;
  };
  const getUstensilsDom = () => {
    const dropdown_ustensils = document.createElement("div");
    dropdown_ustensils.classList.add("dropdown-container");

    let template = `
    <div class="dropdown-toggle">Ustensils</div>
    <div class="dropdown-menu">
      <div class="searchBar_categorie">
        <input class="search_input_categorie" type="search" />
        <div class="iconSearchBar_categorie">
            <i class="fas fa-search"></i>
        </div>
      </div>
      <ul>
        ${ustensils
          .map((name) => {
            return `<li>${name}</li>`;
          })
          .join("")}
      </ul>
    </div>
  `;
    dropdown_ustensils.innerHTML = template;
    return dropdown_ustensils;
  };
  const getApplianceDom = () => {
    const dropdown_appliance = document.createElement("div");
    dropdown_appliance.classList.add("dropdown-container");

    let template = `
    <div class="dropdown-toggle">Appliance</div>
    <div class="dropdown-menu">
      <div class="searchBar_categorie">
        <input class="search_input_categorie" type="search" />
        <div class="iconSearchBar_categorie">
          <i class="fas fa-search"></i>
        </div>
      </div>
      <ul>
        ${appliance
          .map((name) => {
            return `<li>${name}</li>`;
          })
          .join("")}
      </ul>
    </div>
  `;
    dropdown_appliance.innerHTML = template;
    return dropdown_appliance;
  };
  return { getIngredientsDom, getUstensilsDom, getApplianceDom };
};
