const handleDropDown = (idDropDownList) => {
  const dropdown = document.querySelector(`#container_${idDropDownList}`);
  const dropdownMenu = document.querySelector(`#container_${idDropDownList} + .dropdown-menu`);

  if (dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
    dropdownMenu.classList.remove("dropdown-active");
  } else {
    dropdown.classList.add("dropdown-open");
    dropdownMenu.classList.add("dropdown-active");
  }
  handleSearchDropDown(idDropDownList);
};

window.addEventListener("click", function (e) {
  // Close the menu if click happen outside menu
  if (e.target.closest(".dropdown-container") === null) {
    closeDropdown();
  }
});

// Close the opened Dropdown
function closeDropdown() {
  // remove the open and active class from Dropdown (Closing the opened DropDown)
  document.querySelectorAll(".dropdown-toggle").forEach(function (container) {
    container.classList.remove("dropdown-open");
  });

  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    menu.classList.remove("dropdown-active");
  });
}
