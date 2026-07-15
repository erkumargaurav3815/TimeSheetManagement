import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!input.trim()) return;
    console.log("ready to go");

    if (editId !== null) {
      //take all current task
      setTasks(
        //now store current state (tasks)
        (prev) =>
          //check every task
          prev.map((task) =>
            // if t-id != e-id give task else edit i/p
            task.id === editId ? { ...task, title: input } : task,
          ),
        //after edit part is done exit from edit mode
      );
      setEditId(null);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: tasks.length + 1,
          title: input,
          completed: false,
        },
      ]);
    }
    setInput("");
  };

  const markCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      ),
    );
  };

  const editTask = (task: Task) => {
    setInput(task.title);
    setEditId(task.id);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 3,
      }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Todo List
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="text"
          fullWidth
          label="Enter task"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z\s]*$/.test(value)) {
              setInput(value);
            }
          }}
        />

        <Button variant="contained" onClick={handleSubmit} sx={{ my: 2 }}>
          {editId !== null ? "Update" : "Add"}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>Task</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tasks available
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.completed ? "Completed" : "Pending"}
                      color={task.completed ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => markCompleted(task.id)}>
                        {task.completed ? "Done" : "Mark Completed"}
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => editTask(task)}>
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ToDoList;
