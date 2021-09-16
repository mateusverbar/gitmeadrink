fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(ingredientResponse) {
      console.log(ingredientResponse);
      // for (let i = 0; i < ingredientResponse.drinks.length; i++) 
      const drinkId = ingredientResponse.drinks[0].idDrink
      console.log(drinkId);
      return fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId);
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