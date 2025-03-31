import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

export default function TodoListForm({ add }) {
  const [newTodo, setNewTodo] = useState("");
  const handleChange = (evt) => {
    setNewTodo(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    add(newTodo);
    setNewTodo("");
  };
  return (
    <Box sx={{ mb: 1.5 }} component="form" onSubmit={handleSubmit}>
      <FormControl variant="standard" sx={{ display: "flex" }}>
        <InputLabel htmlFor="add-todo">Add a New Todo</InputLabel>
        <Input
          id="add-todo"
          name="add-todo"
          type="text"
          onChange={handleChange}
          value={newTodo}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                arrow
                title="Add"
                placement="right-end"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [-8, -16],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton aria-label={"Add a New Todo"} type="submit">
                  <FormatListBulletedAddIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
