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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import type { Task } from "../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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
  const [errors, setErrors] = useState({
    project: "",
    taskName: "",
    description: "",
    date: "",
    time: "",
  });

  //get the current time
  function getCurrentTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    // Add 0 before single digit values (for own convienience hours & minutes should always be of 2 digits)
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
      const category = editTask.category.toLowerCase();
      setProject(category);
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

  //form modal validation
  const validate = () => {
    const newErrors = {
      project: "",
      taskName: "",
      description: "",
      date: "",
      time: "",
    };

    // if project=assignment then taskName=projectName else taskName=topic
    const taskName = project === "assignment" ? projectName : topic;

    if (!project) {
      newErrors.project = "Category is required";
    }

    if (!taskName.trim()) {
      newErrors.taskName = "Topic/Project name is required";
    } else if (taskName.trim().length < 5) {
      newErrors.taskName = "Minimum 5 characters required";
    } else if (!isAlphabetOnly(taskName)) {
      newErrors.taskName = "Only alphabets are allowed";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 20) {
      newErrors.description = "Minimum 20 characters required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!startTime || !endTime) {
      newErrors.time = "Start Time and End Time are required";
    }

    setErrors(newErrors);

    //get all values from newErrors object and return true if all errors are empty else false
    return Object.values(newErrors).every((err) => err === "");
  };

  //add or update task button function
  const addUpdateButton = () => {
    if (!validate()) return;

    const taskName = project === "assignment" ? projectName : topic;

    const task: Task = {
      id: editTask ? editTask.id : 0,
      category: capitalizeFirstLetter(project),
      name: capitalizeFirstLetter(taskName),
      description: capitalizeFirstLetter(description),
      date,
      startTime,
      endTime,
      timeTaken: calculateDuration(startTime, endTime),
      // status: editTask ? editTask.status : "Pending",
    };

    if (editTask) {
      updateTask(task);
    } else {
      addTask(task);
    }

    handleClose();
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

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.project}>
            <InputLabel>Category</InputLabel>

            <Select value={project} label="Category" onChange={handleChange}>
              <MenuItem value="learning">📚 Learning</MenuItem>
              <MenuItem value="assignment">📝 Assignment</MenuItem>
            </Select>

            {errors.project && (
              <Typography color="error" variant="caption">
                {errors.project}
              </Typography>
            )}
          </FormControl>
          {project === "assignment" ? (
            <TextField
              fullWidth
              label="Project"
              value={projectName}
              onChange={(e) => {
                if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setProjectName(e.target.value);
                }
              }}
              error={!!errors.taskName}
              helperText={errors.taskName}
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
              error={!!errors.taskName}
              helperText={errors.taskName}
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
              setDescription(e.target.value);
            }}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date ? dayjs(date, "DD-MM-YYYY") : null}
              maxDate={dayjs()}
              //when user selects different date from the default (in this case current date) date
              onChange={(value) => {
                setDate(value ? value.format("DD-MM-YYYY") : "");
              }}
              slotProps={{
                //user can't write date manually (user can only select date) bcz of readOnly
                textField: {
                  readOnly: true,
                  error: !!errors.date,
                  helperText: errors.date,
                },
              }}
              sx={{
                width: "100%",
                mb: 2,
              }}
            />
          </LocalizationProvider>

          {/* {error && (
            <Typography
              color="error"
              sx={{
                textAlign: "center",
                mb: 2,
              }}>
              {error}
            </Typography>
          )} */}

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
              error={!!errors.time}
            />

            <TextField
              fullWidth
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              error={!!errors.time}
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

            <Button variant="contained" onClick={addUpdateButton}>
              {editTask ? "Update Task" : "Add Task"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default FormModal;
