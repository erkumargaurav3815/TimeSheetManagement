//code for adding, editing, deleting tasks
import { useEffect, useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import type { Task } from "../types";

interface Props {
  addTask: (task: Task) => void;
  editTask: Task | null;
  updateTask: (task: Task) => void;
}

function FormModal({ addTask, editTask, updateTask }: Props) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  //get the current time
  function getCurrentTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    // Add 0 before single digit values
    const hour = String(currentHour).padStart(2, "0");
    const minute = String(currentMinute).padStart(2, "0");
    // console.log("current time: ", hour, minute);
    return `${hour}:${minute}`;
  }

  // get time after one hour automatically take +1 hour in end time i/p (to improve the ui)
  function getNextHourTime() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const hour = String(currentDate.getHours()).padStart(2, "0");
    const minute = String(currentDate.getMinutes()).padStart(2, "0");
    // console.log("one hour later: ", hour, minute);
    return `${hour}:${minute}`;
  }

  // calculate total working time
  function calculateDuration(startTime: string, endTime: string) {
    // Split time into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    // Convert everything into minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;
    // If end time is smaller , it means it took more than 24hour
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }
    // Find difference
    const totalMinutes = endTotalMinutes - startTotalMinutes;
    // Convert minutes into hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // console.log(hours, minutes);
    return `${hours}h ${minutes}m`;
  }
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getNextHourTime());

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  useEffect(() => {
    if (editTask) {
      setOpen(true);
      setProject(editTask.category);
      if (editTask.category === "assignment") {
        setProjectName(editTask.name);
      } else {
        setTopic(editTask.name);
      }
      setDescription(editTask.description);
      setDate(editTask.date);
      setStartTime(editTask.startTime);
      setEndTime(editTask.endTime);
    }
  }, [editTask]);

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const isAlphabetOnly = (value: string) => {
    return /^[A-Za-z\s]+$/.test(value);
  };
  const resetForm = () => {
    setProject("");
    setProjectName("");
    setTopic("");
    setDescription("");
    setDate("");
    setStartTime(getCurrentTime());
    setEndTime(getNextHourTime());
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Task
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",

            top: "50%",

            left: "50%",

            transform: "translate(-50%,-50%)",

            width: {
              xs: "92%",
              sm: 480,
            },

            bgcolor: "#fff",

            borderRadius: 4,

            p: 4,

            maxHeight: "90vh",

            overflowY: "auto",
          }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 3,
            }}>
            {editTask ? "Edit Task" : "Create New Task"}
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>

            <Select value={project} label="Category" onChange={handleChange}>
              <MenuItem value="learning">📚 Learning</MenuItem>

              <MenuItem value="assignment">📝 Assignment</MenuItem>
            </Select>
          </FormControl>

          {project === "assignment" ? (
            <TextField
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={(e) => {
                if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setProjectName(e.target.value);
                }
              }}
              sx={{ mb: 2 }}
            />
          ) : project === "learning" ? (
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => {
                if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setTopic(e.target.value);
                }
              }}
              sx={{ mb: 2 }}
            />
          ) : null}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setDescription(e.target.value);
              }
            }}
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date ? dayjs(date, "DD-MM-YYYY") : null}
              maxDate={dayjs()}
              onChange={(value) => {
                setDate(value ? value.format("DD-MM-YYYY") : "");
              }}
              sx={{
                width: "100%",
                mb: 2,
              }}
            />
          </LocalizationProvider>

          {error && (
            <Typography
              color="error"
              sx={{
                textAlign: "center",
                mb: 2,
              }}>
              {error}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
            }}>
            <TextField
              fullWidth
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            <TextField
              fullWidth
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                const taskName = project === "assignment" ? projectName : topic;

                if (!project) {
                  setError("Category is required");
                  return;
                }

                if (!taskName.trim()) {
                  setError("Topic/Project name is required");
                  return;
                }

                if (!isAlphabetOnly(taskName)) {
                  setError("Only alphabets are allowed in Topic/Project name");
                  return;
                }

                if (!description.trim()) {
                  setError("Description is required");
                  return;
                }

                if (!isAlphabetOnly(description)) {
                  setError("Only alphabets are allowed in Description");
                  return;
                }

                if (!date) {
                  setError("Date is required");
                  return;
                }

                if (!startTime || !endTime) {
                  setError("Start Time and End Time are required");
                  return;
                }

                setError("");

                const task: Task = {
                  id: editTask ? editTask.id : 0,

                  category: capitalizeFirstLetter(project),

                  name: capitalizeFirstLetter(taskName),

                  description: capitalizeFirstLetter(description),

                  date,

                  startTime,

                  endTime,

                  timeTaken: calculateDuration(startTime, endTime),
                  status: editTask ? editTask.status : "Pending",
                };

                if (editTask) {
                  updateTask(task);
                } else {
                  addTask(task);
                }

                handleClose();
              }}>
              {editTask ? "Update Task" : "Add Task"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default FormModal;
