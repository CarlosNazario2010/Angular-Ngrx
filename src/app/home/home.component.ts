import { Component } from '@angular/core';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

@Component({
  selector: 'app-home',
  imports: [
    AddIngredientComponent,
    ShoppingListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
