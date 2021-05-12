import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url =
    'https://angularrecipes-a0f0d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe((response) => {
      // tslint:disable-next-line:no-console
      console.log(response);
    });
  }

  fetchRecipes(): void {
    this.http.get<Recipe[]>(this.url).subscribe((recipes) => {
      this.recipeService.setRecipies(recipes);
    });
  }
}
