function cardRecetteFactory(card) {
  const { id, appliance, description, image, ingredients, name, servings, time, ustensils } = card;

  const BASE_URL_IMAGE = "./public/images/";

  function getCardRecetteDOM() {
    const section = document.createElement("section");
    section.className = "cardRecette";
    let template = `   
         
              <img class="image_recette" src="${BASE_URL_IMAGE}${image}" alt=recette ${name}/>
              <span class="time">${time}min</span>
              <div class="content_recette">
                <strong class="name_recette">${name}</strong>
                <div class="recette_description_div">
                    <span class="subtitle">RECETTE</span>
                    <p class="description_recette">${description}</p>
                </div>
                <div class="ingredients_div">
                    <span class="subtitle">INGRÉDIENTS</span>
                    <div class="ingredients_details">
                       ${getIngredients()}
                    </div>
                </div>
              </div>
              
          `;
    section.innerHTML = template;
    return section;
  }
  function getIngredients() {
    return ingredients
      .map(
        (element) =>
          `
    <div>
    <p>${element.ingredient}</p>
      <div class="ingredient-measurement">
        ${element.quantity ? `<span>${element.quantity}</span>` : "-"}
        ${element.unit ? `<span>${element.unit}</span>` : ""}
      </div>
    </div>
    `
      )
      .join("");
  }
  return { getCardRecetteDOM };
}
