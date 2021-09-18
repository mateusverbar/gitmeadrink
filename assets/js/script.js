// variable to hold user alcohol selection
// variable to reference the ul div
const recipesEl = document.querySelector(".recipes");

function shuffle(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  arr = arr.slice(0, 20)
  return arr;
}

// variable to create li element to append to ul element
fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'
  )
    .then(function(ingredientResponse) {
      return ingredientResponse.json();
    })
    .then(function(ingredientResponse) {
      console.log(ingredientResponse);
      const drinkList = ingredientResponse.drinks
      let randomDrinks = shuffle(drinkList);
      console.log(randomDrinks);
      
      // drinkId needs to be added as a class to each image
      const drinkId = ingredientResponse.drinks[0].idDrink
      // the drink picture will be posted on the page
      const drinkPicture = ingredientResponse.drinks[0].strDrinkThumb
      // drink name will be added to the span via textContent
      const drinkName = ingredientResponse.drinks[0].strDrink
      // thumbnail needs to print on page, drink id should be id for image


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
     })
    // ;
// fetch to get drink id for drinks that match selected ingredient
// fetch to take the drink id and pass back cocktail recipes
// display the list of recipes in the DOM
// optional clickable drink thumbnail to take them to the drink website in another webpage