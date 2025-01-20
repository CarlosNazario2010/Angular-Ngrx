import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IShoppingListState } from "./shopping-list.state";

// Define o seletor para acessar o estado da lista de compras
const getShoppingListState = createFeatureSelector<IShoppingListState>('shoppingList');

// Seletor para obter a lista de compras ordenada por nome
export const getShoppingList = createSelector(
  getShoppingListState,
  (state: IShoppingListState) =>
    [...state.entities].sort((a, b) => a.name.localeCompare(b.name))
);

// Seletor para verificar se a lista de compras está sendo carregada
export const getShoppingListIsLoading = createSelector(
  getShoppingListState,
  (state: IShoppingListState) => state.isLoading
);

// Seletor para verificar se um item está sendo salvo
export const getShoppingListIsSaving = createSelector(
  getShoppingListState,
  (state: IShoppingListState) => state.isSaving
);

// Seletor para verificar se um item está sendo deletado
export const getShoppingListIsDeleting = createSelector(
  getShoppingListState,
  (state: IShoppingListState) => state.isDeleting
);
