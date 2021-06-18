import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as recipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    this.store.dispatch(new recipeActions.FetchRecipes());
    // take operator uzima samo jednog i nakon toga kompletira i unsubscriba
    // 1. resolver dispachets action i onda čeka da se resolva
    // 2. nakon toga dok se resolva onda čeka da se podaci potegnu
    return this.actions$.pipe(ofType(recipeActions.SET_RECIPES), take(1));

    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   this.store.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
  }
}
