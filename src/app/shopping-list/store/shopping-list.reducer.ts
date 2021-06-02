import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
): any {
  switch (action.type) {
    // naziv akcije
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // kopiramo stariji state i onda overridamo ono što želimo promjeniti
        // koristimo spread operator da izvucemo  elemente/ objekte iz arraya
        ingredients: [...state.ingredients, action.payload],
      };
  }
}
