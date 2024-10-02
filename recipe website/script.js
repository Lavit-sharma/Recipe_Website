const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const  recipedetailscontent=document.querySelector('.recipe-details-content');
const recipecontainer=document.querySelector('.recipe-container');
const recipeclosebtn=document.querySelector('.recipe-close-btn');
  
const fetchRecipes = async(query)=>{
    recipecontainer.innerHTML="<h1>fetching recipes....</h1>";
    try {
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response= await data.json();
    recipecontainer.innerHTML=""
    response.meals.forEach(meal=> {
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span></p>
        <p>Belong to <span>${meal.strCategory} </span> Category</p>
        `
        const button =document.createElement('button');
        button.textContent="View Recipe";
        recipediv.appendChild(button);
        button.addEventListener('click',()=>{
         openRecipePopup(meal);
        });
        recipecontainer.appendChild(recipediv);
    });
} catch (error) {
        recipecontainer.innerHTML=`<img src="recipenotfound.png" class="recipenotfound"/>`
}
    //console.log(response.meals[0]);
}
const fetchingredient = (meal)=>{
    let ingredientslist="";
    for(let i=1;i<=20;i++){
        const ingredients=meal[`strIngredient${i}`];
        if(ingredients){
            const measure =meal[`strMeasure${i}`];
            ingredientslist +=`<li>${measure} ${ingredients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
    
}
const openRecipePopup=(meal)=>{
 recipedetailscontent.innerHTML=`
 <h2 class="recipename">${meal.strMeal}</h2>
 <h3>Ingredients:</h3>
 <ul class="ingredientlist">${fetchingredient(meal)}</ul>
 <div class="recipeinstructions">
 <h>Instructions:</h>
 <p>${meal.strInstructions}</p>
</div>`

 recipedetailscontent.parentElement.style.display="block";
};
recipeclosebtn.addEventListener('click',()=>{
    recipedetailscontent.parentElement.style.display="none";
})
searchBtn.addEventListener('click',(e)=>{

    e.preventDefault();
    const searchInput= searchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML= `<h1>Please type the meal in search box </h1>`;
        return;
    }
    fetchRecipes(searchInput);
});