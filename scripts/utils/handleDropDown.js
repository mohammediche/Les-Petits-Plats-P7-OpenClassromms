function handleDropDown() {
  const dropdownContainer = document.querySelectorAll(".dropdown-container");
  const dropdownMenuContainer = document.querySelectorAll(".dropdown-menu");

  for (let i = 0; i < dropdownContainer.length; i++) {
    const dropdown = dropdownContainer[i];
    const dropdownMenu = dropdownMenuContainer[i];
    // onclick open / close dropDown
    dropdown.addEventListener("click", (e) => {
      if (dropdown.classList.contains("dropdown-open")) {
        dropdown.classList.remove("dropdown-open");
        dropdownMenu.classList.remove("dropdown-active");
      } else {
        dropdown.classList.add("dropdown-open");
        dropdownMenu.classList.add("dropdown-active");
      }
    });
  }
}

window.addEventListener("click", function (e) {
  // Close the menu if click happen outside menu
  if (e.target.closest(".dropdown-container") === null) {
    closeDropdown();
  }
});

// Close the opened Dropdown
function closeDropdown() {
  // remove the open and active class from Dropdown (Closing the opened DropDown)
  document.querySelectorAll(".dropdown-container").forEach(function (container) {
    container.classList.remove("dropdown-open");
  });

  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    menu.classList.remove("dropdown-active");
  });
}
