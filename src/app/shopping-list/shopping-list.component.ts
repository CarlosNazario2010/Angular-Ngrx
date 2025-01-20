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
  imports: [CommonModule]
})
export class ShoppingListComponent implements OnInit {

  private store!: Store;

  constructor(store: Store) { }

  ingredients$ = this.store.pipe(
    select(getShoppingList)
  )

  isSaving$ = this.store.pipe(
    select(getShoppingListIsSaving)
  )

  isDeleting$ = this.store.pipe(
    select(getShoppingListIsDeleting)
  )

  ngOnInit(): void {
    this.store.dispatch(loadShoppingList())
  }

  removeIngredient(item: IShoppingListItem) {
    this.store.dispatch(removeShoppingListItem({ item }))
  }
}
