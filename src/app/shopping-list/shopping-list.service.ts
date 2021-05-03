import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngridients(ingridients: Ingredient[]): void {
    // for (const ingredient of ingridients) {
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingridients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
