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
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchBar from "../Components/TimeSheetSearchBar";
import DeleteTaskAlert from "../Components/DeleteTaskAlert";
import { filterTasks } from "../Components/TimeSheetSearchBar/filterTasks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TimeSheet() {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task[]>([]);
  //for Delete Alert using MUI
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  //get user from localStorage
  const loggedInUser = localStorage.getItem("loggedInUser");
  // get tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (!loggedInUser) return [];
    const savedTasks = localStorage.getItem(`tasks-${loggedInUser}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //search tasks
  const [search, setSearch] = useState("");
  const filteredTasks = filterTasks(tasks, search);

  // Save tasks for the logged-in user
  useEffect(() => {
    if (!loggedInUser) return;
    localStorage.setItem(`tasks-${loggedInUser}`, JSON.stringify(tasks));
  }, [tasks, loggedInUser]);

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

  // update task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    //update view task whenever the task is updated
    setViewTask((prev) =>
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
    setSelectedTaskId(id);
    setOpenDelete(true);
  };
  const handleDeleteConfirm = () => {
    if (selectedTaskId !== null) {
      setTasks((prev) => prev.filter((task) => task.id !== selectedTaskId));
      setViewTask((prev) => prev.filter((task) => task.id !== selectedTaskId));
    }
    setOpenDelete(false);
    setSelectedTaskId(null);
  };
  const handleDeleteCancel = () => {
    setOpenDelete(false);
    setSelectedTaskId(null);
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

  for (const task of filteredTasks) {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }
    groupedTasks[task.date].push(task);
  }

  // only first task of each date for table
  const taskLists = Object.values(groupedTasks);
  const tableTasks = taskLists.map((taskList) => {
    return taskList[0];
  });

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
          // m: 3,
        }}
        variant="h4">
        Time Sheet Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* Search bar starts */}
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <SearchBar value={search} onChange={setSearch} />
        </Box>
        {/* Search bar ends */}

        <FormModal
          addTask={addTask}
          editTask={editTask}
          updateTask={updateTask}
        />
      </Box>

      {filteredTasks.length === 0 ? (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          {search ? "No matching tasks found" : "No Tasks Available"}
        </Typography>
      ) : (
        <TaskTable
          tasks={tableTasks}
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
                xs: "95%",
                sm: "85%",
                md: 700,
              },
              maxWidth: 800,
              bgcolor: "background.paper",
              borderRadius: 3,
              p: 3,
              boxShadow: 24,
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                textAlign: "center",
              }}>
              Tasks on {viewTask[0].date}
            </Typography>

            {viewTask.map((task) => (
              <Accordion
                key={task.id}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:before": {
                    display: "none",
                  },
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      pr: 2,
                    }}>
                    {task.name}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography>
                      <strong>Category:</strong> {task.category}
                    </Typography>

                    <Typography
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}>
                      <strong>Description:</strong>
                      {task.description}
                    </Typography>

                    <Typography>
                      <strong>Time Taken:</strong> {task.timeTaken}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        mt: 1,
                      }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(task)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => deleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}>
              <Button variant="contained" onClick={closeView}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      <DeleteTaskAlert
        open={openDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}

export default TimeSheet;
