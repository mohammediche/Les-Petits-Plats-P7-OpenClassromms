const handleSearchDropDown = (id) => {
  // récupérer l'input de la bonne catégorie
  const searchInput = document.getElementById(`searchInput_${id}`);
  // récupérer la liste actuel du droDown de la bonne catégorie
  const myList = document.querySelector(`#${id}`);

  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    // convertir les li de la liste, en un tableau
    const listItems = Array.from(myList.getElementsByTagName("li"));
    listItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      if (itemText.includes(searchText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
};
