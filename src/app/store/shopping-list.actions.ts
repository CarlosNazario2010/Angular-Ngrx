import { createAction, props } from "@ngrx/store";
import { IShoppingListCreateBase, IShoppingListItem } from "./shopping-list.state";

// Ação para iniciar o carregamento da lista de compras
export const loadShoppingList = createAction(
  '[Shopping List] Load Shopping List',
);

// Ação disparada com sucesso após o carregamento da lista de compras
// Transporta um array de itens da lista de compras
export const loadShoppingListSuccess = createAction(
  '[Shopping List Effects] Load Shopping List Success',
  props<{ entities: IShoppingListItem[] }>()
);

// Ação disparada em caso de erro durante o carregamento da lista de compras
export const loadShoppingListError = createAction(
  '[Shopping List Effects] Load Shopping List Error',
);

// Ação para adicionar um novo item à lista de compras
// Transporta um objeto com as informações básicas do item a ser adicionado
export const addShoppingListItem = createAction(
  '[Add Ingredient] Add Shopping List Item',
  props<{ item: IShoppingListCreateBase }>()
);

// Ação disparada com sucesso após a adição de um item à lista de compras
// Transporta o item adicionado com o ID atribuído pelo servidor
export const addShoppingListItemSuccess = createAction(
  '[Shopping List Effects] Add Shopping List Item Success',
  props<{ item: IShoppingListItem }>()
);

// Ação disparada em caso de erro durante a adição de um item à lista de compras
export const addShoppingListItemError = createAction(
  '[Shopping List Effects] Add Shopping List Item Error',
);

// Ação para remover um item da lista de compras
// Transporta o objeto do item a ser removido
export const removeShoppingListItem = createAction(
  '[Shopping List] Remove Shopping List Item',
  props<{ item: IShoppingListItem }>()
);

// Ação disparada com sucesso após a remoção de um item da lista de compras
export const removeShoppingListItemSuccess = createAction(
  '[Shopping List Effects] Remove Shopping List Item Success',
);

// Ação disparada em caso de erro durante a remoção de um item da lista de compras
// Transporta o item que não pode ser removido (opcional)
export const removeShoppingListItemError = createAction(
  '[Shopping List Effects] Remove Shopping List Item Error',
  props<{ item: IShoppingListItem }>()
);
