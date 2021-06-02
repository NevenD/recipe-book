import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  // ne možemo mijenjati vrijednost u protivnom ćemo dobiti error
  readonly type = ADD_INGREDIENT;
  // mogli smo nazvati varijablu kako smo htjeli
  payload: Ingredient;
}
