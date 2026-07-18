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

  const getCurrentTime = () => {
    const now = new Date();

    return now.toTimeString().slice(0, 5);
  };

  const getOneHourLater = () => {
    const now = new Date();

    now.setHours(now.getHours() + 1);

    return now.toTimeString().slice(0, 5);
  };

  const [startTime, setStartTime] = useState(getCurrentTime());

  const [endTime, setEndTime] = useState(getOneHourLater());

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

  const calculateWorkingHours = (start: string, end: string) => {
    const startDate = new Date(`1970-01-01T${start}`);

    const endDate = new Date(`1970-01-01T${end}`);

    let diff = endDate.getTime() - startDate.getTime();

    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const resetForm = () => {
    setProject("");

    setProjectName("");

    setTopic("");

    setDescription("");

    setDate("");

    setStartTime(getCurrentTime());

    setEndTime(getOneHourLater());
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
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ mb: 2 }}
            />
          ) : project === "learning" ? (
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              sx={{ mb: 2 }}
            />
          ) : null}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                const task: Task = {
                  id: editTask ? editTask.id : 0,

                  category: project,

                  name: project === "assignment" ? projectName : topic,

                  description,

                  date,

                  startTime,

                  endTime,

                  timeTaken: calculateWorkingHours(startTime, endTime),

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
