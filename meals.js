document.getElementById("search-btn").addEventListener("click", (even) => {
    document.getElementById("details-container").innerHTML = "";
    const InputValue = document.getElementById("search-bar").value;
    // console.log("Iam Here.");
    // console.log(InputValue);
 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${InputValue}`)
    .then(res => res.json())
    .then(data=>{
        // console.log(data);
        DisplayProducts(data);
    });
    document.getElementById("search-bar").value = "";
});
const DisplayProducts = (Object) => {
    // console.log(products.meals)
    const arr = Object.meals;
    const container = document.getElementById("product-section");

    container.innerHTML = "";

    for(const element of arr){
        // console.log(element);
        const div = document.createElement("div");

        div.classList.add("product-card");
       
        div.innerHTML =`
            <img class="card-img" src="${element.strMealThumb}"/>
            <h2 class="img-title">${element.strMeal}</h2>
        `;

        container.appendChild(div);
    }

    const card = document.getElementsByClassName("product-card");
    for(const ele of card){
        // console.log(ele.innerText);
        ele.addEventListener("click", (event)=>{
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ele.innerText}`)
            .then(res => res.json())
            .then(data => 
                
                // console.log(data.meals)
                FoodDetails(data.meals)

            );
            
        });
    };

};

const FoodDetails = (itemDetails) => {
    const DetailsContainer = document.getElementById("details-container");
    // console.log(itemDetails[0]);
    DetailsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("details-box");
    div.innerHTML = `
        <img class="details-card-img" src="${itemDetails[0].strMealThumb}"/>
        <h3 class="img-title">${itemDetails[0].strMeal}</h3>
        <h4>Ingredients</h4>

        <li>${itemDetails[0].strIngredient1}</li>
        <li>${itemDetails[0].strIngredient2}</li>
        <li>${itemDetails[0].strIngredient3}</li>
        <li>${itemDetails[0].strIngredient4}</li>
        <li>${itemDetails[0].strIngredient5}</li>
        <li>${itemDetails[0].strIngredient6}</li>
        <li>${itemDetails[0].strIngredient7}</li>
        <li>${itemDetails[0].strIngredient8}</li>

    `;

    DetailsContainer.appendChild(div);
};



