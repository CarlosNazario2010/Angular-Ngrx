import { createReducer, on } from "@ngrx/store";
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
import { IShoppingListState } from "./shopping-list.state";

export const initialState: IShoppingListState = {
  entities: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};

// Define o reducer para o estado da lista de compras
export const shoppingListReducer = createReducer(
  initialState,

  // Ação para carregar a lista de compras: define o estado como 'carregando'
  on(loadShoppingList, (state) => ({
    ...state,
    isLoading: true,
  })),

  // Ação para carregar a lista com sucesso: atualiza o estado com os itens carregados e finaliza o carregamento
  on(loadShoppingListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
  })),

  // Ação para erro no carregamento: finaliza o carregamento
  on(loadShoppingListError, (state) => ({
    ...state,
    isLoading: false,
  })),

  // Ação para adicionar um item: define o estado como 'salvando'
  on(addShoppingListItem, (state) => ({
    ...state,
    isSaving: true,
  })),

  // Ação para adição bem-sucedida: adiciona o novo item ao array de itens e finaliza a operação de salvamento
  on(addShoppingListItemSuccess, (state, { item }) => ({
    ...state,
    entities: [...state.entities, item],
    isSaving: false,
  })),

  // Ação para erro na adição: finaliza a operação de salvamento
  on(addShoppingListItemError, (state) => ({
    ...state,
    isSaving: false,
  })),

  // Ação para remover um item: define o estado como 'deletando'
  on(removeShoppingListItem, (state, { item }) => ({
    ...state,
    isDeleting: true,
    entities: state.entities.filter((i) => i.id !== item.id),
  })),

  // Ação para remoção bem-sucedida: finaliza a operação de deleção
  on(removeShoppingListItemSuccess, (state) => ({
    ...state,
    isDeleting: false,
  })),

  // Ação para erro na remoção: restaura o item no array (caso necessário) e finaliza a operação de deleção
  on(removeShoppingListItemError, (state, { item }) => ({
    ...state,
    isDeleting: false,
    entities: [...state.entities, item],
  })),
);
