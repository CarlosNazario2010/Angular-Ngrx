import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, of, switchMap } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import {
  addShoppingListItem,
  addShoppingListItemError,
  addShoppingListItemSuccess,
  loadShoppingList,
  loadShoppingListError,
  loadShoppingListSuccess,
  removeShoppingListItem,
  removeShoppingListItemError,
  removeShoppingListItemSuccess,
} from "./shopping-list.actions";

// Efeito para carregar a lista de compras
export const loadShoppingListEffect = createEffect((
  actions$ = inject(Actions),
  service = inject(ShoppingListService)
) =>
  actions$.pipe(
    // Escuta pela ação 'loadShoppingList'
    ofType(loadShoppingList),
    // Utiliza 'switchMap' para cancelar requisições anteriores e iniciar uma nova
    switchMap(() =>
      // Chama o serviço para obter os ingredientes
      service.getIngredients().pipe(
        // Mapeia o resultado para a ação de sucesso, transportando os itens
        map((entities) => loadShoppingListSuccess({ entities })),
        // Captura e trata possíveis erros, disparando a ação de erro
        catchError(() => of(loadShoppingListError()))
      )
    )
  ),
  { functional: true }
);

// Efeito para adicionar um item à lista de compras
export const addShoppingListEffect = createEffect((
  actions$ = inject(Actions),
  service = inject(ShoppingListService)
) =>
  actions$.pipe(
    // Escuta pela ação 'addShoppingListItem'
    ofType(addShoppingListItem),
    // Simula um delay para fins de demonstração (remover em produção)
    delay(2_000),
    // Utiliza 'mergeMap' para lidar com múltiplas ações de adição simultaneamente
    mergeMap(({ item }) =>
      // Chama o serviço para adicionar o ingrediente
      service.addIngredient(item).pipe(
        // Mapeia o resultado para a ação de sucesso, transportando o item criado
        map((itemCreated) => addShoppingListItemSuccess({ item: itemCreated })),
        // Captura e trata possíveis erros, disparando a ação de erro
        catchError(() => of(addShoppingListItemError()))
      )
    )
  ),
  { functional: true }
);

// Efeito para remover um item da lista de compras
export const removeShoppingListItemEffect = createEffect((
  actions$ = inject(Actions),
  service = inject(ShoppingListService)
) =>
  actions$.pipe(
    // Escuta pela ação 'removeShoppingListItem'
    ofType(removeShoppingListItem),
    // Simula um delay para fins de demonstração (remover em produção)
    delay(2_000),
    // Utiliza 'mergeMap' para lidar com múltiplas ações de remoção simultaneamente
    mergeMap(({ item }) =>
      // Chama o serviço para remover o ingrediente
      service.removeIngredient(item).pipe(
        // Mapeia o resultado para a ação de sucesso
        map(() => removeShoppingListItemSuccess()),
        // Captura e trata possíveis erros, disparando a ação de erro, transportando o item que não pode ser removido
        catchError(() => of(removeShoppingListItemError({ item })))
      )
    )
  ),
  { functional: true }
);
