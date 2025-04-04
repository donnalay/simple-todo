import { useState, useEffect } from "react";

//crypto.randomUUID() can also generate random unique IDs
import { v4 as uuidv4 } from "uuid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

import TodoListForm from "./TodoListForm";
import TodoListItem from "./TodoListItem";
import EmptySleep from "./EmptySleep";

//if there is data in local storage, return it, if not, return empty array
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
      //can also use: id: crypto.randomUUID()
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

  //reset all
  const reset = () => {
    setTodos((prev) => {
      return prev.map((e) => {
        return { ...e, done: false };
      });
    });
  };

  const incompleteCount = todos.filter((todo) => !todo.done).length;

  const btnStyles = { height: "max-content", textTransform: "none", gap: 0.5 };

  const disabledResetBtn = (
    <Button
      sx={btnStyles}
      variant="outlined"
      size="small"
      onClick={reset}
      disabled
    >
      <RemoveDoneIcon />
      Mark all: Not done
    </Button>
  );
  const resetBtn = (
    <Button sx={btnStyles} variant="outlined" size="small" onClick={reset}>
      <RemoveDoneIcon />
      Mark all: Not done
    </Button>
  );

  const disabledRemoveBtn = (
    <Button
      sx={btnStyles}
      variant="outlined"
      size="small"
      onClick={clear}
      disabled
    >
      <PlaylistRemoveIcon />
      Remove all
    </Button>
  );
  const removeBtn = (
    <Button sx={btnStyles} variant="outlined" size="small" onClick={clear}>
      <PlaylistRemoveIcon />
      Remove all
    </Button>
  );

  return (
    <Box
      sx={{
        m: "32px 16px",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: 2,
      }}
    >
      <h1 style={{ m: 0, lineHeight: 0.5 }}>Todos</h1>
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
        <p style={{ margin: "0.5rem 0", padding: 0 }}>
          {!incompleteCount
            ? "No Todos on your list! What will you do today?"
            : `You have ${incompleteCount} Todos`}
        </p>

        {!todos.length ? null : (
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
          >
            {todos.some((todo) => todo.done) ? resetBtn : disabledResetBtn}
            {!todos.length ? disabledRemoveBtn : removeBtn}
          </Box>
        )}
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
