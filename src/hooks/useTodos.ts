import { useState } from "react";
import type { Filter } from "@/constants/filter";
import type { Todo } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function addTodo(text: string) {
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
  }

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

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const canHandleEmpty = todos.every((todo) => !todo.removed);

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return !todo.removed;
    if (filter === "checked") return todo.checked && !todo.removed;
    if (filter === "unchecked") return !todo.checked && !todo.removed;
    if (filter === "removed") return todo.removed;
  });

  return {
    addTodo,
    editTodo,
    checkTodo,
    removeTodo,
    handleFilter,
    handleEmpty,
    filter,
    canHandleEmpty,
    filteredTodos,
  };
}
