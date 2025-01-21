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
            <ul>
                {ingredientList}
            </ul>
        </>
    )

}


export default Main;