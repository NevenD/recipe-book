import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    // loadChildren: './recipes/recipes.module#RecipesModule', // lazy loading tek kad dodjemo na tu stranicu onda se preuzimaju
    loadChildren: () =>
      import('./recipes/recipes.module').then((module) => module.RecipesModule), // alternativni pristup  i nešto moderniji način pozivanja lazy loadinga
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (module) => module.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ], // preloading strategy i pripremiti će code bundles (npr. shopping list i recipe modules) što je prije moguće
  exports: [RouterModule],
})
export class AppRoutingModule {}
