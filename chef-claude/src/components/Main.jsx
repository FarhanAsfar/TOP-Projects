import React from "react";
import IngredientList from "./IngredientList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai"

function Main() {
  
  const [recipe, setRecipe] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);


  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function handleRecipe() {
    // setRecipeShown((prevState) => !prevState);
    const aiRecipe = await getRecipeFromMistral(ingredients)
    setRecipe(aiRecipe);
    // console.log(aiRecipe)
  }

  return (
    <>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          name="ingredient"
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          required
        />
        <button>Add Ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientList 
          handleRecipe={handleRecipe}
          ingredients={ingredients}
          
        />
      )}

      {recipe ? (
        <ClaudeRecipe recipe={recipe}/>
      ) : null}
    </>
  );
}

export default Main;
