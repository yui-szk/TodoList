import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
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
  const {
    addTodo,
    editTodo,
    checkTodo,
    removeTodo,
    handleFilter,
    handleEmpty,
    filter,
    canHandleEmpty,
    filteredTodos,
  } = useTodos();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <Select
        options={filters.map((v) => ({ value: v, name: v }))}
        defaultValue={"all"}
        onChange={(e) => handleFilter(e.target.value as Filter)}
      />
      {filter === "removed" ? (
        <button onClick={handleEmpty} disabled={canHandleEmpty}>
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
