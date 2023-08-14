const getTags = () => {
  console.log("it's getTags fonction !");
  const allTags = document.querySelector(".all-tags");
  const tagsArray = JSON.parse(localStorage.getItem("selectedTags"));
  //   const tagDiv = document.createElement("div");

  let template = tagsArray
    ? tagsArray
        .map((tag) => {
          return `  
         <div>
            <span>${tag}</span>
            <button class="remove-tag-button"><i class="fas fa-times"></i></button>
        </div>`;
        })
        .join("")
    : null;
  allTags.innerHTML = template;
};
getTags();
