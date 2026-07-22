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
import { useTaskForm } from "../hooks/useTaskForm";
import { useTime } from "../hooks/useTime";
import { useValidation } from "../hooks/useValidation";

interface Props {
  addTask: (task: Task) => void;
  editTask: Task | null;
  updateTask: (task: Task) => void;
}

function FormModal({ addTask, editTask, updateTask }: Props) {
  const [open, setOpen] = useState(false);
  const {
    project,
    setProject,
    projectName,
    setProjectName,
    topic,
    setTopic,
    description,
    setDescription,
    date,
    setDate,
    resetForm,
  } = useTaskForm();

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    calculateDuration,
    resetTime,
  } = useTime();

  const { errors, validate } = useValidation();

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  useEffect(() => {
    if (editTask) {
      //open modal
      setOpen(true);
      const category = editTask.category.toLowerCase();
      setProject(category);
      if (category === "assignment") {
        setProjectName(editTask.name);
      } else {
        setTopic(editTask.name);
      }
      setDescription(editTask.description);
      setDate(editTask.date);
      setStartTime(editTask.startTime);
      setEndTime(editTask.endTime);
    }
  }, [
    editTask,
    setProject,
    setProjectName,
    setTopic,
    setDescription,
    setDate,
    setStartTime,
    setEndTime,
  ]);
  //if user edits the category
  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  //add or update task button function
  const addUpdateButton = () => {
    if (
      !validate(
        project,
        projectName,
        topic,
        description,
        date,
        startTime,
        endTime,
      )
    )
      return;

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
    };

    if (editTask) {
      updateTask(task);
    } else {
      addTask(task);
    }

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    resetTime();
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
