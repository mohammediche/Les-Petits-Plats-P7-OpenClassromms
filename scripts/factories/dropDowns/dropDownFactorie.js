const dropDownFactorie = () => {
  const getDropDownsDom = (data, dropDownName, id) => {
    const dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("dropdown-container");

    let template = `
      <div class="dropdown-toggle" id="container_${id}" onclick="handleDropDown('${id}')">${dropDownName}</div>
      <div class="dropdown-menu">
        <div class="searchBar_categorie">
          <input class="search_input_categorie" type="search" id="searchInput_${id}"/>
          <div class="iconSearchBar_categorie">
            <i class="fas fa-search"></i>
          </div>
        </div>
        ${displayDataList(data, id)}
      </div>
    `;
    dropDownDiv.innerHTML = template;
    return dropDownDiv;
  };

  const displayDataList = (data, idUl) => {
    return `
        <ul id=${idUl}>
        ${data
          .map((name) => {
            return `<li>${name}</li>`;
          })
          .join("")}
      </ul>
    `;
  };

  return { getDropDownsDom };
};
