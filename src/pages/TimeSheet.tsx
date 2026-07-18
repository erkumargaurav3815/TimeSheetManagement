import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormModal from "../Components/FormModal";
import TaskTable from "../Components/TaskTable";
import type { Task } from "../types";
import { Modal, Button } from "@mui/material";
function TimeSheet() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  // add tasks
  const addTask = (task: Task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: prev.length + 1, // 1,2,3...
      },
    ]);
  };

  //update status of tasks
  const completeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task,
      ),
    );
  };

  //edit tasks
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    setEditTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
  };

  //delete  tasks
  const deleteTask = (id: number) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);

      return updatedTasks.map((task, index) => ({
        ...task,
        id: index + 1,
      }));
    });
  };

  //view tasks
  const handleView = (task: Task) => {
    setViewTask(task);
  };
  const closeView = () => {
    setViewTask(null);
  };

  //keep tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 3,
      }}>
      <Typography
        sx={{
          textAlign: "center",
          mb: 3,
        }}
        variant="h4">
        Time Sheet Management
      </Typography>

      <FormModal
        addTask={addTask}
        editTask={editTask}
        updateTask={updateTask}
      />

      {tasks.length === 0 ? (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          No Tasks Available
        </Typography>
      ) : (
        <TaskTable
          tasks={tasks}
          completeTask={completeTask}
          handleEdit={handleEdit}
          deleteTask={deleteTask}
          handleView={handleView}
        />
      )}
      {viewTask && (
        <Modal open={Boolean(viewTask)} onClose={closeView}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: {
                xs: "90%",
                sm: 450,
              },

              bgcolor: "white",
              borderRadius: 4,
              p: 4,
              boxShadow: 24,
            }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 3,
              }}>
              Task Details
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>ID:</b> {viewTask.id}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Date:</b> {viewTask.date}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Category:</b> {viewTask.category}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Task:</b> {viewTask.name}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Description:</b> {viewTask.description}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Start Time:</b> {viewTask.startTime}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>End Time:</b> {viewTask.endTime}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <b>Total Time:</b> {viewTask.timeTaken}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b>Status:</b> {viewTask.status}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <Button variant="contained" onClick={closeView}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default TimeSheet;
