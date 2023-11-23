import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { Select } from "./Select";

export type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

const filters = ["all", "checked", "unchecked", "removed"] as const;
export type Filter = (typeof filters)[number];

export function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  };

  function editTodo({ id, value }: Pick<Todo, "id" | "value">) {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, value } : todo))
    );
  }

  function checkTodo({ id, checked }: Pick<Todo, "id" | "checked">) {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, checked } : todo))
    );
  }

  function removeTodo({ id, removed }: Pick<Todo, "id" | "removed">) {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, removed } : todo))
    );
  }

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <Select
        options={filters.map((v) => ({ value: v, name: v }))}
        defaultValue={"all"}
        onChange={(e) => handleSort(e.target.value as Filter)}
      />
      {filter === "removed" ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          Clear Dustbin
        </button>
      ) : (
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="Add" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}
