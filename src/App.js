import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    #todoListView = new TodoListView();
    #todoListModel = new TodoListModel([]);

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ id, completed }) {
        this.#todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }) {
        this.#todoListModel.deleteTodo({ id });
    }

    /**
   * Todoを検索した時に呼ばれるリスナー関数
   * @param {string} title
   */
    handleSearch(title) {
        this.todoListModel.searchTodo({ title });
    }

    mount() {
        const formElement = document.querySelector("#create-task");
        const searchFormElement = document.querySelector('#js-search-form');
        const inputElement = document.querySelector("#js-form-create");
        const containerElement = document.querySelector("#js-todo-list");
        const searchInputElement = document.querySelector('#js-search-input');
        this.#todoListModel.onChange(() => {
            const todoItems = this.#todoListModel.getTodoItems();
            const todoListElement = this.#todoListView.createElement(todoItems, {
                // Appに定義したリスナー関数を呼び出す
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                }
            });
            render(todoListElement, containerElement);
        });

        this.#todoListModel.onSearch(() => {
            const searchedTodoItems = this.#todoListModel.getSearchedTodoItems();
            const todoItem =
                searchInputElement.value !== '' ? searchedTodoItems : this.#todoListModel.getTodoItems();

            const todoListElement = this.#todoListView.createElement(todoItem, {
                // Appに定義したリスナー関数を呼び出す
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                },
            });
            render(todoListElement, containerElement);
        });

        // Todo追加時の処理
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleAdd(inputElement.value);
            inputElement.value = '';
        });

        //検索フォーム入力時の処理
        searchInputElement.addEventListener('input', (event) => {
            this.handleSearch(searchInputElement.value);
        });

        searchFormElement.addEventListener('submit', (event) => {
            // 検索フォームでエンターをクリックしてもイベント発火を防ぐようにしている
            event.preventDefault();
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleAdd(inputElement.value);
            inputElement.value = "";
        });
    }
}
