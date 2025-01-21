import IngredientList from "./IngredientList";
import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";

function Main() {
  
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);


  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function handleRecipe() {
    setRecipeShown((prevState) => !prevState);
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

      {recipeShown ? (
        <ClaudeRecipe />
      ) : null}
    </>
  );
}

export default Main;
