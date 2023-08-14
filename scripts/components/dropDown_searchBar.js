const handleSearchDropDown = (id) => {
  // récupérer l'input de la bonne catégorie
  const searchInput = document.getElementById(`searchInput_${id}`);
  // récupérer la liste actuel du droDown de la bonne catégorie
  const myList = document.querySelector(`#${id}`);
  // convertir ma liste ul, en un tableau de li
  const listItems = Array.from(myList.getElementsByTagName("li"));

  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    listItems.forEach((item) => {
      const itemText = enleverMajusculesAccents(item.textContent.toLowerCase());
      if (itemText.includes(searchText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
};
