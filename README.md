# NgrxShoppingList

Projeto de uma lista de compras que usar o gerenciador de estado Ngrx do Angular. Projeto clonado do repositorio do GitHub do YouTuber Maransatto.


# Para rodar o Projeto

1 - Faca um git clone do repositorio
2 - Instale o AngularCLI com o seguinte comando na raiz do projeto:
    'npm install -g @angular/cli'
3 - Instale as dependencias necessarias com o comando:
    'npm install'
4 - Rode o projeto com: 'ng serve'. A aplicacao roda em: 'localhost:4200'


# States

IShoppingListCreateBase:

  Define a estrutura básica para criar um novo item na lista de compras.
Contém apenas as propriedades essenciais para a criação: name (nome do item) e quantity (quantidade).

IShoppingListItem:

  Define a interface completa para representar um item da lista de compras.
Herda as propriedades name e quantity de IShoppingListCreateBase.
Adiciona a propriedade id para identificar de forma única cada item.

IShoppingListState:

  Define o estado global da lista de compras, gerenciado pelo NgRx.
entities: Armazena um array de objetos IShoppingListItem, representando todos os itens da lista.

  isLoading: Indica se a lista de compras está sendo carregada do servidor.

  isSaving: Indica se um item está atualmente sendo salvo no servidor.

  isDeleting: Indica se um item está atualmente sendo deletado do servidor.


# Actions

  loadShoppingList: Inicia o processo de carregamento da lista de compras.

  loadShoppingListSuccess: Disparada após o carregamento bem-sucedido da lista de compras, transportando um array de objetos IShoppingListItem.

  loadShoppingListError: Disparada em caso de falha no carregamento da lista de compras.

------------------------------------------------------------------------------

  addShoppingListItem: Disparada para adicionar um novo item à lista de compras, recebendo as informações básicas do item.

  addShoppingListItemSuccess: Disparada após a adição bem-sucedida do item, transportando o item completo com o ID atribuído.

  addShoppingListItemError: Disparada em caso de falha na adição do item.
  
  removeShoppingListItem: Disparada para remover um item da lista de compras, recebendo o objeto do item a ser removido.

-------------------------------------------------------------------------------

  removeShoppingListItemSuccess: Disparada após a remoção bem-sucedida do item.

  removeShoppingListItemError: Disparada em caso de falha na remoção do item, opcionalmente transportando o item que não pode ser removido.


# Reducers

  shoppingListReducer: Define o reducer para o estado da lista de compras, responsável por processar as actions e atualizar o estado.

  initialState: Define o estado inicial da lista de compras, contendo um array vazio de itens e flags para indicar o carregamento, salvamento e deleção.

  createReducer: Cria o reducer utilizando o createReducer do NgRx.

----------------------------------------------------------------------------------

Ações de Carregamento:

  loadShoppingList: Define o estado como isLoading: true para indicar o início do carregamento.

  loadShoppingListSuccess: Atualiza o estado com os itens carregados (entities) e finaliza o carregamento (isLoading: false).

  loadShoppingListError: Finaliza o carregamento (isLoading: false), mas a lista nao sera carregada.

---------------------------------------------------------------------------------

Ações de Adição:

  addShoppingListItem: Define o estado como isSaving: true para indicar o início do salvamento.

  addShoppingListItemSuccess: Adiciona o novo item ao array de itens (entities) e finaliza o salvamento (isSaving: false).

  addShoppingListItemError: Finaliza o salvamento (isSaving: false), mas o item nao sera salvo no array.

--------------------------------------------------------------------------------

Ações de Remoção:

  removeShoppingListItem: Define o estado como isDeleting: true para indicar o início da deleção e remove o item do array (entities).

  removeShoppingListItemSuccess: Finaliza a remocao do item no array de itens e finaliza a exclusao (isDeleting: false)

  removeShoppingListItemError: Finaliza a exclusao com erro, ou seja, o item nao sera removido


# Selectors

  getShoppingListState: Define o seletor para acessar o estado da lista de compras a partir do NgRx.

  getShoppingList: 
  Seletor que obtém a lista de compras ordenada pelo nome do item.
  Ele acessa o estado da lista de compras (getShoppingListState).
  Copia o array de itens (entities) para evitar mutação do estado original.
  Ordena o array de itens pela propriedade name usando localeCompare para ordenação sensível a acentos.
  Retorna a lista ordenada.

  getShoppingListIsLoading: Seletor que verifica se a lista de compras está sendo carregada.
  Ele acessa o estado da lista de compras (getShoppingListState).
  Retorna o valor da propriedade isLoading do estado.

  getShoppingListIsSaving: Seletor que verifica se um item está sendo salvo.
  Ele acessa o estado da lista de compras (getShoppingListState).
  Retorna o valor da propriedade isSaving do estado.

  getShoppingListIsDeleting: Seletor que verifica se um item está sendo deletado.
  Ele acessa o estado da lista de compras (getShoppingListState).
  Retorna o valor da propriedade isDeleting do estado.


# Effects

  loadShoppingListEffect:

  Escuta pela ação loadShoppingList.
  Utiliza switchMap para cancelar requisições anteriores e iniciar uma nova requisição ao serviço.
  Chama o método getIngredients() do serviço para obter a lista de compras.
  Mapeia o resultado para a ação loadShoppingListSuccess, passando os itens carregados.
  Captura e trata possíveis erros, disparando a ação loadShoppingListError.

  addShoppingListEffect:

  Escuta pela ação addShoppingListItem.
  Utiliza delay (somente para demonstração, remover em produção).
  Utiliza mergeMap para lidar com múltiplas ações de adição simultaneamente.
  Chama o método addIngredient() do serviço para adicionar o item.
  Mapeia o resultado para a ação addShoppingListItemSuccess, passando o item criado.
  Captura e trata possíveis erros, disparando a ação addShoppingListItemError.

  removeShoppingListItemEffect:

  Escuta pela ação removeShoppingListItem.
  Utiliza delay (somente para demonstração, remover em produção).
  Utiliza mergeMap para lidar com múltiplas ações de remoção simultaneamente.
  Chama o método removeIngredient() do serviço para remover o item.
  Mapeia o resultado para a ação removeShoppingListItemSuccess.
  Captura e trata possíveis erros, disparando a ação removeShoppingListItemError e passando o item que não pode ser removido.
