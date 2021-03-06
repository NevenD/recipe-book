import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
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
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, // kopiramo cijeli objekt, a zatim promijenimo ono što se samo treba promijeniti
        ...action.payload,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const deletedIngredient = state.ingredients.filter((ig, index) => {
        return index !== state.editedIngredientIndex;
      });
      return {
        ...state,
        ingredients: deletedIngredient,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
