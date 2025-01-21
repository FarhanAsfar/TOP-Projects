import React from "react"

function Main(){
    const [ingredients, setIngredients] = React.useState([]);

    const ingredientList = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");
        
        setIngredients(prevIngredients => (
            [...prevIngredients, newIngredient]
        ));
    }
    
    return(
        <>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                name="ingredient"
                type="text" 
                aria-label="Add ingredient"
                placeholder="e.g. oregano"/>
                <button>Add Ingredient</button>
            </form>
            
            <section>
                <h2>Ingredients on hand: </h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientList}</ul>
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your ingredients list.</p>
                    </div>
                    <button>Get a recipe</button>
                </div>
            </section>
        </>
    )

}


export default Main;