// variable to hold user alcohol selection
// variable to reference the ul div
const recipesEl = document.querySelector(".recipes");

function eventListenerHandler() {
  let drinkClass = document.querySelectorAll(".drink");
  // let drinkArray = Array.prototype.slice.call(drinkClass);
  console.log(drinkClass);
  // console.log(drinkArray);
  for(let i = 0; i < drinkClass.length; i++) {
    console.log(drinkClass[i]);
    drinkClass[i].addEventListener("click", displayRecipe());
  }
}

function shuffle(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  arr = arr.slice(0, 20)
  return arr;
}


function displayDrink() {
  
  let alcoholType = document.querySelector("#alcohol-type").value;
  
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
}


    // post the thumbnail to page
  // use 2nd fetch request details about selected drink
  // random 20 thumbnails on page; add link asking user if they would like to load another random 20
    //   return fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId);
    // })
    // .then(function(drinkDetails) {
    //   return drinkDetails.json();
    // })
    // .then(function(drinkDetails) {
    //   console.log(drinkDetails);
    // ;
// fetch to get drink id for drinks that match selected ingredient
// fetch to take the drink id and pass back cocktail recipes
// display the list of recipes in the DOM
// optional clickable drink thumbnail to take them to the drink website in another webpage