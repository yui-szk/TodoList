import { useState } from "react";

type Todo = {
  value: string;
};

export function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit={(e) => e.preventDefault()}
        />
      </form>
      <p>{text}</p>
    </div>
  );
}
