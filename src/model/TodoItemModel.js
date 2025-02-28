// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
    /** @type {number} TodoアイテムのID */
    id;
    /** @type {string} Todoアイテムのタイトル */
    title;

    /**
     * @param {{ title: string, completed: boolean }}
     */
    constructor({ title }) {
        // idは連番となり、それぞれのインスタンス毎に異なるものとする
        this.id = todoIdx++;
        this.title = title;
    }
}
