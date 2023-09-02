const getTags = () => {
  const allTags = document.querySelector(".all-tags");
  const tagsArray = JSON.parse(localStorage.getItem("selectedTagsLS"));

  let template = tagsArray
    ? tagsArray
        .map((tagObject) => {
          const idListUl = Object.keys(tagObject)[0]; // La clé idListUl
          const tagItems = tagObject[idListUl]; // Les éléments correspondants

          const tagHtml = tagItems
            .map((tag) => {
              return `
              <div>
                <span>${tag}</span>
                <button class="remove-tag-button" id="${idListUl}" data-tag="${tag}"><i class="fas fa-times"></i></button>
              </div>`;
            })
            .join("");

          return tagHtml;
        })
        .join("")
    : "";

  allTags.innerHTML = template;

  // Ajouter des gestionnaires d'événements pour les boutons de suppression
  const removeButtons = document.querySelectorAll(".remove-tag-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const idListUl = e.target.parentNode.id;
      const tagToRemove = e.target.parentNode.dataset.tag;

      // Mettre à jour le tableau dans le localStorage en supprimant l'élément
      let selectedTagsLS = JSON.parse(localStorage.getItem("selectedTagsLS")) || [];
      const index = selectedTagsLS.findIndex((item) => item.hasOwnProperty(idListUl));

      // Vérification si l'élément existe dans le tableau
      if (index !== -1) {
        // Suppression de l'élément du tableau
        const updatedTags = selectedTagsLS[index][idListUl].filter((tag) => tag !== tagToRemove);
        // Si l'objet est vide après la suppression, le supprimer complètement
        if (updatedTags.length === 0) {
          selectedTagsLS.splice(index, 1);
        } else {
          selectedTagsLS[index][idListUl] = updatedTags;
        }
        localStorage.setItem("selectedTagsLS", JSON.stringify(selectedTagsLS));

        // Mettre à jour l'affichage des tags
        getTags();
        const allDataCardsRecette = await getCardRecetteData();
        initFilterRecipes_ByLocalStorageTags(allDataCardsRecette);
      }
    });
  });
};

getTags();
