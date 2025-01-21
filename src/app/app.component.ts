import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddIngredientComponent } from "./add-ingredient/add-ingredient.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AddIngredientComponent,
    ShoppingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meu-front-reativo';
}
