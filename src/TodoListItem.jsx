import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import Stamp from "./Stamp";
import Box from "@mui/material/Box";

export default function TodoListItem({ todo, update, remove }) {
  const labelId = `checkbox-list-label-${todo.id}`;
  const updateTodo = () => {
    update(todo.id);
  };
  const removeTodo = () => {
    remove(todo.id);
  };

  return (
    <ListItem
      secondaryAction={
        <Tooltip
          arrow
          title="Remove"
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
          <IconButton edge="end" aria-label="Remove" onClick={removeTodo}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        dense
        sx={{
          backgroundColor: !todo.done ? "#e9edc9" : "none",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#ccd5ae",
            borderRadius: 2,
          },
          "& .MuiTouchRipple-root": {
            color: "rgba(147, 225, 0, 0.90)",
          },
        }}
      >
        <ListItemIcon>
          <Tooltip
            arrow
            title={!todo.done ? "Mark Done" : "Mark Not Done"}
            placement="left-end"
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
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              slotProps={{ "aria-labelledby": labelId }}
              onChange={updateTodo}
              checked={todo.done}
            />
          </Tooltip>
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={todo.text}
          sx={{
            textDecoration: !todo.done ? "none" : "line-through",
            opacity: !todo.done ? 1 : 0.5,
          }}
        />
        <Box
          style={{
            height: !todo.done ? "0" : "auto",
            opacity: !todo.done ? 0 : 1,
            transformOrigin: !todo.done ? "100% 0%" : "20% 40%",
            transition: !todo.done
              ? "600ms"
              : "325ms cubic-bezier(0, 0.64, 1, 0.33)",
            transform: !todo.done
              ? "rotate(0deg) scale(0)"
              : "rotate(15deg) scale(1)",
          }}
        >
          <Stamp />
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
