

function Main(){
    const ingredients = ["chick", "oregano", "tomao"];

    const ingredientList = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))

    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get("ingredient");
        ingredients.push(newIngredient);
        console.log(ingredients);
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input 
                name="ingredient"
                type="text" 
                aria-label="Add ingredient"
                placeholder="e.g. oregano"/>
                <button>Add Ingredient</button>
            </form>
            <ul>
                {ingredientList}
            </ul>
        </>
    )

}


export default Main;