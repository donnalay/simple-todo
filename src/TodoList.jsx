import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TodoListForm from "./TodoListForm";
import TodoListItem from "./TodoListItem";
import EmptySleep from "./EmptySleep";
import { v4 as uuidv4 } from "uuid";

const getInitialTodos = () => {
  const initialTodos = JSON.parse(localStorage.getItem("Todos"));
  return !initialTodos ? [] : initialTodos;
};

export default function TodoList() {
  //store todos in state
  const [todos, setTodos] = useState(getInitialTodos);

  //save todos in local storage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  //add
  const addTodo = (newTodo) => {
    setTodos((prev) => {
      return [...prev, { id: uuidv4(), text: newTodo, done: false }];
    });
  };

  //remove
  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  //update
  const updateTodo = (id) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        } else {
          return { ...todo };
        }
      });
    });
  };

  //clear all
  const clear = () => {
    setTodos([]);
  };

  const incompleteCount = todos.filter((todo) => !todo.done).length;

  return (
    <Box
      sx={{
        m: "64px 24px",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <Box
          sx={{
            m: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <h1 style={{ margin: 0, lineHeight: 0 }}>Todos</h1>
          <Button
            sx={{ height: "max-content" }}
            variant="outlined"
            size="small"
            onClick={clear}
          >
            Clear all
          </Button>
        </Box>
      </Box>
      <TodoListForm add={addTodo} />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: !incompleteCount ? "center" : null,
          justifyContent: !incompleteCount ? "center" : null,
          gap: 4,
          backgroundColor: !incompleteCount
            ? "rgba(233, 237, 201, 1)"
            : "rgba(233, 237, 201, 0)",
          padding: !incompleteCount ? "32px" : "0",
          transition: "300ms ease-in-out",
          borderRadius: "8px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {!incompleteCount && <EmptySleep />}
        <p>
          {!incompleteCount
            ? "No Todos on your list! What will you do today?"
            : `You have ${incompleteCount} Todos`}
        </p>
      </Box>
      {todos.map((item) => {
        return (
          <TodoListItem
            key={item.id}
            todo={item}
            remove={removeTodo}
            update={updateTodo}
          />
        );
      })}
    </Box>
  );
}
