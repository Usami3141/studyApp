//Todoアイテムの型定義
type Todo = {
    id: number;
    text: string;
    done: boolean;
    createdAt: Date;
};

export type { Todo };