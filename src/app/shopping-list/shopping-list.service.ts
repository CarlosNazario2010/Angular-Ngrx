import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { IShoppingListCreateBase, IShoppingListItem } from "../store/shopping-list.state";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ShoppingListService {

  /**
   *  Nessa classe que ficariam as chamadas http para o backend, caso a aplicacao
   * fosse usada de verdade. Como eh apenas um exemplo, as chamadas sao simuladas
   * atraves de um mock com uma lista de ingredientes
   * @param http
   */

  constructor(private http: HttpClient) { }

  ingredientsMock: IShoppingListItem[] = [
        {
            id: 1,
            name: 'Milk',
            quantity: 1
        },
        {
            id: 2,
            name: 'Bread',
            quantity: 2
        },
        {
            id: 3,
            name: 'Coconut',
            quantity: 2
        },
    ];

  getIngredients() {
    return of(this.ingredientsMock);
  }

  addIngredient(item: IShoppingListCreateBase) {
    const newItem = {
      ...item,
      id: this.ingredientsMock.length + 1
    }
    this.ingredientsMock = [...this.ingredientsMock, newItem];
    return of(newItem);
  }

  removeIngredient(item: IShoppingListItem) {
    this.ingredientsMock = this.ingredientsMock.filter(i => i.id !== item.id);
    return of(null);
  }
}
