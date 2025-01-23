import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadShoppingList, removeShoppingListItem } from '../store/shopping-list.actions';
import { getShoppingList, getShoppingListIsDeleting, getShoppingListIsSaving } from '../store/shopping-list.selectors';
import { IShoppingListItem } from '../store/shopping-list.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [
    CommonModule
  ],
  providers: []
})
export class ShoppingListComponent implements OnInit {

  store = inject(Store<any>);

  ngOnInit(): void {
    this.store.dispatch(loadShoppingList());
  }

  ingredients$ = this.store.pipe(
    select(getShoppingList)
  );

  isSaving$ = this.store.pipe(
    select(getShoppingListIsSaving)
  )

  isDeleting$ = this.store.pipe(
    select(getShoppingListIsDeleting)
  )

  removeIngredient(item: IShoppingListItem) {
    this.store.dispatch(removeShoppingListItem({ item }))
  }
}
