export default function IngredientList(props) {

    const ingredientList = props.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ));
  
    return (
        <section>
        <h2>Ingredients on hand: </h2>
        <ul className="ingredients-list" aria-live="polite">
            {ingredientList}
        </ul>
        {props.ingredients.length > 4 && (
            <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your ingredients list.</p>
            </div>
            <button onClick={props.handleRecipe}>Get a recipe</button>
            </div>
        )}
        </section>
  );
}
