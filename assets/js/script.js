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
  recipeNameEl.textContent=`${alcoholType}!`;

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
          let drinkPicture = randomDrinks[i].strDrinkThumb

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

          drinkDivEl.addEventListener("click", ()=>displayRecipe(drinkId));//changed drinkImgEl to drinkDivEl so if they click anywhere in the div

          recipesEl.appendChild(drinkDivEl)
          drinkDivEl.appendChild(drinkTitleEl);
          drinkDivEl.appendChild(drinkImageEl)

          //create the button 
          // <button type="button" id="refresh" class="alcohol-type">Refresh List</button>

          
        }
        // var refreshBtn = document.createElement("button");
          
        //   refreshBtn.setAttribute("type","button");
        //   refreshBtn.setAttribute("id","refresh");
        //   refreshBtn.classList.add("alcohol-type","w-100");
        //   refreshBtn.textContent="Refresh List";

        //   document.querySelector(".flex-container").appendChild(refreshBtn);
      })
}

function displayRecipe(drinkId) {
  console.log(drinkId);
  document.querySelector(".modal-body").innerHTML="";// clears out modal content on new selection
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId)
  .then(function(drinkDetails) {
    return drinkDetails.json()
  })
  .then(function(drinkDetails) {
    console.log(drinkDetails.drinks[0]);

    //ingredients, amounts, and instructions
    
    getMetheIngredients(drinkDetails.drinks[0]);

    //ingredient = drinkDetails.drinks[0].strIngredient1;
    //console.log(ingredient);

    document.querySelector(".modal-title").textContent = drinkName;
    document.querySelector(".modal-body").innerHTML=`<p>Ingredients:<p> 
    <p>${ingredient} - ${measurement}<p>`;

    // document.querySelector(".modal-body").innerHTML=`${ingredient}:  ${measure}`;
    // document.querySelector(".modal-title").textContent=drinkName;
    // $("#drink-form-modal").modal("show")

    // possibly create an objects with key value pairs using the ingredient for the key and the measurement for the value
    //push all the ingredients and measurements into an array
    //loop through the array to return an ingredient and measurement combo if not null in the modal if not null


  });
}


function getMetheIngredients(obj) {
  for (let i = 1; i < 20; i++) {      //Thanks Rommel for this for-loop!
    if (!obj[`strIngredient${i}`]) {
      break;
      } else {
      let ingredient = obj[`strIngredient${i}`];
      let measure = obj[`strMeasure${i}`];
      let instructions = obj[`strInstructions`];
      console.log(ingredient);
      console.log(measure);
      console.log(instructions);

      drinkName = obj[`strDrink`];
      console.log(drinkName);

      var ingredientListEl = document.createElement("ul");
      var ingredientListItemEl = document.createElement("li");
      var ingredientTitle = document.createElement("h5");
      ingredientTitle.textContent="Ingredients";

      var instructionsTitle = document.createElement("h5");
      instructionsTitle.textContent="Instructions";
      var instructionsEl = document.createElement("p");

      instructionsEl.innerHTML=instructions;
      
      ingredientListItemEl.innerHTML=`${ingredient}:  ${measure}`;

      document.querySelector(".modal-body").appendChild(ingredientListEl);
      ingredientListEl.appendChild(ingredientListItemEl);
      
      //document.querySelector(".modal-body").innerHTML=`${ingredient}:  ${measure}`;
      //document.querySelector(".modal-body").innerHTML="<h1>" + ingredient + ":</h1>";
      document.querySelector(".modal-title").textContent=drinkName;
      $("#drink-form-modal").modal("show")
      }
  }

  ingredientListEl.appendChild(ingredientTitle);


  document.querySelector(".modal-body").appendChild(instructionsTitle);
  document.querySelector(".modal-body").appendChild(instructionsEl); //This one has to be here otherwise you get the instructions printed after each list item
};






    // let drinkName = drinkDetails.strDrink
    // console.log(drinkName);

    // let modalEl = document.createElement("div");
    // modalEl.classList.add("modal");
    // modalEl.setAttribute("id","drinkModal");

    // let modalContentEl = document.createElement("div");
    // modalContentEl.classList.add("modal-content");


    // modalContent.innerHTML(`${drinkDetails}`)



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

document.querySelector("#refresh").addEventListener("click",displayDrink);
