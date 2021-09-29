let savedDrink = {
}
// variable to grab the recipes div
const recipesEl = document.querySelector(".recipes");

// function is used to shuffle the order of an array
function shuffle(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  arr = arr.slice(0, 20)
  return arr;
}

function displayDrink() {
  
  // grabs the users alcohol selection
  let alcoholType = document.querySelector("#alcohol-type").value;
  let recipeNameEl = document.querySelector("#recipe-name");

  // add the users selection in the recipe name span to verify user selection
  recipeNameEl.textContent=`${alcoholType}!`;

  // sets the recipe div to empty
  recipesEl.textContent = "";

  // pass the users alcohol selection into the fetch
  fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholType}`
    )
      .then(function(ingredientResponse) {
        return ingredientResponse.json();
      })
      .then(function(ingredientResponse) {
        
        const drinkList = ingredientResponse.drinks

        // shuffle drinks in the array
        let randomDrinks = shuffle(drinkList);


        for (let i = 0; i < randomDrinks.length; i++) {
          let drinkId = randomDrinks[i].idDrink
          let drinkName = randomDrinks[i].strDrink
          let drinkPicture = randomDrinks[i].strDrinkThumb

          // create a flex div to hold all the drink images
          let drinkDivEl = document.createElement("div")
          drinkDivEl.classList.add("flex-item");

          // create the element for the drink and set it to name
          let drinkTitleEl = document.createElement("span");
          drinkTitleEl.innerHTML = 
            `<h4>${drinkName}</h4>`

          // create an image element for each of the drinks in the random drinks array
          let drinkImageEl = document.createElement("img");
          drinkImageEl.classList.add("drink");
          drinkImageEl.setAttribute("id", `${drinkId}`);
          drinkImageEl.setAttribute("alt", `${drinkName}`);
          drinkImageEl.setAttribute("src", `${drinkPicture}`);

          // add a click event to the drinkDivEl that will run the displayRecipe function as a call back function and pass the drinkId on where called
          drinkDivEl.addEventListener("click", ()=>displayRecipe(drinkId));

          recipesEl.appendChild(drinkDivEl)
          drinkDivEl.appendChild(drinkTitleEl);
          drinkDivEl.appendChild(drinkImageEl)

          
        }
        // create a refresh button to append after all the pictures
        var refreshBtn = document.createElement("button");
          
        refreshBtn.setAttribute("type","button");
        refreshBtn.setAttribute("id","refresh");
        refreshBtn.classList.add("alcohol-type","w-100");
        refreshBtn.textContent="Refresh List";

        document.querySelector(".flex-container").appendChild(refreshBtn);

        // add a click event to the refresh button to rerun the displayDrink function to display new drinks on the page
        document.querySelector("#refresh").addEventListener("click",displayDrink);
      })
}

function displayRecipe(drinkId) {
  
  // clears out modal content on new selection
  document.querySelector(".modal-body").innerHTML="";

  // pass the drinkId to the 2nd fetch to retreive details about the drink
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
  .then(function(drinkDetails) {
    return drinkDetails.json()
  })
  .then(function(drinkDetails) {
    
    // pass the array from the response to the getMetheingredients function
    getMetheIngredients(drinkDetails.drinks[0]);

  });
}

// let savedDrinkList = [];

let savedDrink = {
  ingredientList: [],
  measurementList: []
};

function getMetheIngredients(obj) {

  // savedDrinkList = [];

  savedDrink = {
    ingredientList: [],
    measurementList: []
  };

  var ingredientListEl = document.createElement("ul");
  var ingredientTitle = document.createElement("h5");

  // append the ul element to the modal body
  document.querySelector(".modal-body").appendChild(ingredientListEl);
  // append the title for the ingredients to the ul element
  ingredientListEl.appendChild(ingredientTitle);

  let savedDrinks = {

  }

  for (let i = 1; i < 20; i++) { 
    // if the value of strIngredient is null ignore it
    if (!obj[`strIngredient${i}`]) {
      break;
      } else {
      // otherwise grab the specified information
      drinkName = obj[`strDrink`];
      savedDrink.name = drinkName;

      let image = obj[`strDrinkThumb`]
      savedDrink.picture = image;

      let ingredient = obj[`strIngredient${i}`];
      savedDrink.ingredientList.push(ingredient);

      let measure = obj[`strMeasure${i}`];
      savedDrink.measurementList.push(measure);

      let instructions = obj[`strInstructions`];
      savedDrink.instructionsList = instructions;


      // create the li element to hold the ingredients
      var ingredientListItemEl = document.createElement("li");

      // sets ingredient title text
      ingredientTitle.textContent="Ingredients:";
      
      // creates a title element for the instructions
      var instructionsTitle = document.createElement("h5");
      instructionsTitle.textContent="Instructions:";
      var instructionsEl = document.createElement("p");

      // sets the element html to the instructions from the response
      instructionsEl.innerHTML=instructions;
      
      // sets the li item to the ingredient and measurement for that ingredient
      ingredientListItemEl.innerHTML=`${ingredient} - ${measure}`;
      
      // then append the ingredients list to the ul element
      ingredientListEl.appendChild(ingredientListItemEl);
      
      // sets the drink name in the modal header
      document.querySelector(".modal-title").textContent=drinkName;

      // opens the modal manually
      $("#drink-form-modal").modal("show")
      }
  }
  document.querySelector(".modal-body").appendChild(instructionsTitle);
   //This one has to be here otherwise you get the instructions printed after each list item
  document.querySelector(".modal-body").appendChild(instructionsEl);
};

function saveDrink() {
  
  let storedDrinks = JSON.parse(localStorage.getItem("savedDrinks")) || [];

  storedDrinks.push(savedDrink);
  localStorage.setItem("savedDrinks", JSON.stringify(storedDrinks));
  
  loadDrinks();
  
};

document.querySelector("#save-btn").addEventListener("click", saveDrink);

function loadDrinks() {
  let savedEl = document.querySelector("#saved-drinks");

  if (localStorage.getItem("savedDrinks") !== null) {
    
    savedEl.textContent = "Here are your saved drinks! It's drinking time!";
    savedEl.setAttribute("href", "./saved.html");
    document.querySelector(".meta-header").appendChild(savedEl);

  } else {
    savedEl.textContent = "You haven't saved any drinks yet! Git drinking!";
  };
};

loadDrinks();
