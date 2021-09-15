fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'
  )
    .then(function(ingredientResponse) {
      return ingredientResponse.json();
    })
    .then(function(ingredientResponse) {
      console.log(ingredientResponse);
      const drinkId = ingredientResponse.drinks[0].idDrink
      console.log(drinkId);
      return fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007");
    })
    .then(function(drinkDetails) {
      return drinkDetails.json();
    })
    .then(function(drinkDetails) {
      console.log(drinkDetails);
    })
    ;
// fetch to get drink id for drinks that match selected ingredient
// fetch to take the drink id and pass back cocktail recipes
// display the list of recipes in the DOM
// optional clickable drink thumbnail to take them to the drink website in another webpage