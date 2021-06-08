import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // mogli smo i na ovaj način ali bi onda poslije trebali maknuti subscription
    // this.subscription = this.store
    //   .select('shoppingList')
    //   .subscribe((res: { ingredients: Ingredient[] }) => {
    //     this.ingredients = res.ingredients;
    //   });
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
