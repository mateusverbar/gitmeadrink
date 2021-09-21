// variable to hold user alcohol selection
// variable to reference the ul div
const recipesEl = document.querySelector(".recipes");

function shuffle(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  arr = arr.slice(0, 20)
  return arr;
}

function getMeTheIngredients(obj) {
  for (let i = 1; i < 20; i++) {
    if (!obj[`strIngredient${i}`]) {
      break;
    }
    console.log(obj[`strIngredient${i}`]);
    console.log(obj[`strMeasure${i}`]);
  }
}


function displayDrink() {
  
  let alcoholType = document.querySelector("#alcohol-type").value;
  let recipeNameEl = document.querySelector("#recipe-name");
  recipeNameEl.textContent = `${alcoholType}!`;
  
  recipesEl.textContent = "";
  // variable to create li element to append to ul element
  fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholType}`
    )
      .then(function(ingredientResponse) {
        return ingredientResponse.json();
      })
      .then(function(ingredientResponse) {
        console.log(ingredientResponse);

        const drinkList = ingredientResponse.drinks
        let randomDrinks = shuffle(drinkList);
        console.log(randomDrinks);

        for (let i = 0; i < randomDrinks.length; i++) {
          let drinkId = randomDrinks[i].idDrink
          let drinkName = randomDrinks[i].strDrink
          let  drinkPicture = randomDrinks[i].strDrinkThumb

          let drinkDivEl = document.createElement("div")
          drinkDivEl.classList.add("flex-item");

          let drinkTitleEl = document.createElement("span");
          drinkTitleEl.innerHTML = 
            `<h4>${drinkName}</h4>`

          let drinkImageEl = document.createElement("img");
          drinkImageEl.classList.add("drink");
          drinkImageEl.setAttribute("id", `${drinkId}`);
          drinkImageEl.setAttribute("alt", `${drinkName}`);
          drinkImageEl.setAttribute("src", `${drinkPicture}`);

          drinkImageEl.addEventListener("click", ()=>displayRecipe(drinkId));

          recipesEl.appendChild(drinkDivEl)
          drinkDivEl.appendChild(drinkTitleEl);
          drinkDivEl.appendChild(drinkImageEl)

        }
      })
}

function displayRecipe(drinkId) {
  console.log(drinkId);
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId)
  .then(function(drinkDetails) {
    return drinkDetails.json()
  })
  .then(function(drinkDetails) {
    console.log(drinkDetails.drinks[0]);
    drinkName = drinkDetails.drinks[0].strDrink;

    getMeTheIngredients(drinkDetails.drinks[0]);
    
    ingredient = drinkDetails.drinks[0].strIngredient1;
    console.log(ingredient);

    measurement = drinkDetails.drinks[0].strMeasure1;
    console.log(measurement);

    document.querySelector(".modal-title").textContent = drinkName;
    document.querySelector(".modal-body").innerHTML=`<p>Ingredients:<p> 
    <p>${ingredient} - ${measurement}<p>`;

    $("#drink-form-modal").modal("show")

    // possibly create an objects with key value pairs using the ingredient for the key and the measurement for the value
    //push all the ingredients and measurements into an array
    //loop through the array to return an ingredient and measurement combo if not null in the modal if not null


  });

}

// create a label (maybe in the header that will tell the user how many drinks the first fetch returned)
// add functionality to the refresh button

