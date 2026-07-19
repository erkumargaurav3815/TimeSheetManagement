import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormModal from "../Components/FormModal";
import TaskTable from "../Components/TaskTable";
import type { Task } from "../Components/types";
import {
  Modal,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TimeSheet() {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task[]>([]);

  // get tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // add task
  const addTask = (task: Task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
      },
    ]);
  };

  // complete task
  const completeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task,
      ),
    );
  };

  // update task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    setEditTask(null);
  };

  // edit
  const handleEdit = (task: Task) => {
    setEditTask(task);
  };

  // delete
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // view tasks of same date
  const handleView = (task: Task) => {
    const sameDateTasks = tasks.filter((item) => item.date === task.date);

    setViewTask(sameDateTasks);
  };

  const closeView = () => {
    setViewTask([]);
  };

  // group tasks by date for viewing
  const groupedTasks: Record<string, Task[]> = {};

  for (const task of tasks) {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }

    groupedTasks[task.date].push(task);
  }

  // only first task of each date for table
  const tableTasks = Object.values(groupedTasks).map((taskList) => taskList[0]);

  return (
    <Box
      sx={{
        maxWidth: 1200,
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
          tasks={tableTasks}
          completeTask={completeTask}
          handleEdit={handleEdit}
          deleteTask={deleteTask}
          handleView={handleView}
        />
      )}

      {viewTask.length > 0 && (
        <Modal open={true} onClose={closeView}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: {
                xs: "90%",
                sm: 500,
              },

              bgcolor: "white",
              borderRadius: 3,
              p: 3,
              boxShadow: 24,

              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 3,
              }}>
              Tasks on {viewTask[0].date}
            </Typography>

            {viewTask.map((task) => (
              <Accordion
                key={task.id}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700 }}>{task.name}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>
                    <b>Category:</b> {task.category}
                  </Typography>

                  <Typography>
                    <b>Description:</b> {task.description}
                  </Typography>

                  <Typography>
                    <b>Time Taken:</b> {task.timeTaken}
                  </Typography>

                  <Typography>
                    <b>Status:</b> {task.status}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
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
