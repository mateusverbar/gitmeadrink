// pull from localStorage
const savedDrinks = JSON.parse(localStorage.getItem("savedDrinks"));

const drinkEl = document.querySelector(".drinks");

function displayDrink() {

    for (let i = 0; i < savedDrinks.length; i++) {

        let drinkName = savedDrinks[i].name;
        let drinkImg = savedDrinks[i].picture;

        // create flex div to hold images
        let drinkDivEl = document.createElement("div");
        drinkDivEl.classList.add("flex-item");

        // create element to display drink name
        let drinkTitleEl = document.createElement("span");
        drinkTitleEl.innerHTML =
            `<h4>${drinkName}<h4>`
        
        // create img element for each drink
        let drinkImageEl = document.createElement("img");
        drinkImageEl.classList.add("drink");
        drinkImageEl.setAttribute("alt", `${drinkName}`);
        drinkImageEl.setAttribute("src", `${drinkImg}`);

        // add a click event to the drinkDiv that will show recipe in modal
        drinkDivEl.addEventListener("click", ()=>displayRecipe(savedDrinks[i]));
        
        drinkEl.appendChild(drinkDivEl);
        drinkDivEl.appendChild(drinkTitleEl);
        drinkDivEl.appendChild(drinkImageEl);

    }
}

function displayRecipe(obj) {

    // clear out modal content on new selection
    document.querySelector(".modal-body").innerHTML="";
    // create ul element to hold ingredient list
    let ingredientListEl = document.createElement("ul");
    let ingredientTitle = document.createElement("h5");

    // append ul element to the modal body
    document.querySelector(".modal-body").appendChild(ingredientListEl);
    // append title for ingredients to the ul element
    ingredientListEl.appendChild(ingredientTitle);

    let instructionsTitle = document.createElement("h5");
    let instructionsEl = document.createElement("p");

    drinkName = obj['name'];
    let ingredients = obj['ingredientList'];
    let measure = obj['measurementList'];
    let instructions = obj['instructionsList'];

    for (i = 0; i < ingredients.length; i++) {
        
        // create the li element to hold the ingredients
        let ingredientListItemEl = document.createElement("li");
        ingredientListItemEl.innerHTML = `${ingredients[i]} - ${measure[i]}`;

        // sets ingredient title text
        ingredientTitle.textContent ="Ingredients:";

        // set the text for title element for the instructions
        instructionsTitle.textContent="Instructions:";

        // set text for p element to hold the instructions
        instructionsEl.innerHTML=instructions;

        // append ingredients to the ul element
        ingredientListEl.appendChild(ingredientListItemEl);

        // sets the modal header to the drink name
        document.querySelector(".modal-title").textContent=drinkName;

        // open the modal
        $("#drink-form-modal").modal("show");

    }

    document.querySelector(".modal-body").appendChild(instructionsTitle);
    document.querySelector(".modal-body").appendChild(instructionsEl);
};


displayDrink();