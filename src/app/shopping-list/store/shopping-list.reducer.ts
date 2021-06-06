import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
): any {
  switch (action.type) {
    // naziv akcije
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // kopiramo stariji state i onda overridamo ono što želimo promjeniti
        // koristimo spread operator da izvucemo  elemente/ objekte iz arraya
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      // console.log(action.payload);
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload], // koristimo spread operator koji će izvuci elemente iz arraya
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient, // kopiramo cijeli objekt, a zatim promijenimo ono što se samo treba promijeniti
        ...action.payload.ingredient,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const deletedIngredient = state.ingredients.filter((ig, index) => {
        return index !== action.payload;
      });
      return { ...state, ingredients: deletedIngredient };
    default:
      return state;
  }
}
