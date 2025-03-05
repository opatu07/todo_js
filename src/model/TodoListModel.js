import { EventEmitter } from "../EventEmitter.js";
/* utils */
import { searchResult } from '../common.js';

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.#items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.#items;
    }

    getSearchedTodoItems() {
        return this.searchedItems;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
   * 検索された時に呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
    onSearch(listener) {
        this.addEventListener('search', listener);
    }

    /**
   * 検索された時に呼ぶ。
   */
    emitSearch() {
        this.emit('search');
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{ id: number }}
     */
    deleteTodo({ id }) {
        // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
        this.#items = this.#items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }

    /**
   * 検索に一致する
   * @param { title: string }
   */
    searchTodo({ title }) {
        // 正規表現を用いて、部分一致したTodoのみ表示
        this.searchedItems = this.items.filter((todo) => {
            return searchResult(title, todo.title);
        });

        this.emitSearch();
    }
}
