// Define a interface base para criação de itens na lista de compras
// Contém apenas as propriedades necessárias para criar um novo item
export interface IShoppingListCreateBase {
  name: string;
  quantity: number;
}

// Define a interface para representar um item completo da lista de compras
// Herda de IShoppingListCreateBase e adiciona a propriedade 'id'
export interface IShoppingListItem extends IShoppingListCreateBase {
  id: number;
}

// Define o estado global da lista de compras
// Contém informações sobre os itens, o estado de carregamento e operações
export interface IShoppingListState {
  entities: IShoppingListItem[]; // Array de itens da lista de compras
  isLoading: boolean;          // Indica se a lista de compras está sendo carregada
  isSaving: boolean;           // Indica se um item está sendo salvo
  isDeleting: boolean;          // Indica se um item está sendo deletado
}
