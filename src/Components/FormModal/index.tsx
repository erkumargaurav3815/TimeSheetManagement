import { useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import Time from "../Time";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function FormModal() {
  // open modal
  const [open, setOpen] = useState(false);
  //assignment
  const [projectName, setProjectName] = useState("");
  // learning
  const [topic, setTopic] = useState("");
  //description
  const [description, setDescription] = useState("");
  //drop down
  const [project, setProject] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };
  //restrict user from entering next day date
  const maxDate = dayjs();

  const handleClose = () => {
    setOpen(false);
    setProjectName("");
    setDescription("");
    setProject("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Task
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", sm: 480 },
              bgcolor: "#fff",
              borderRadius: 4,
              boxShadow: "0 25px 70px rgba(0,0,0,0.15)",
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}>
                Create New Project
              </Typography>
            </Box>

            {/* Category */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>

              <Select
                value={project}
                label="Category"
                onChange={handleChange}
                sx={{
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                }}>
                <MenuItem value="learning">📚 Learning</MenuItem>

                <MenuItem value="assignment">📝 Assignment</MenuItem>
              </Select>
            </FormControl>
            {/* Project Name */}
            {project === "" ? null : project === "assignment" ? (
              <TextField
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#fafafa",
                  },
                }}
              />
            ) : (
              <TextField
                fullWidth
                label="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#fafafa",
                  },
                }}
              />
            )}
            {/* Description */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                },
              }}
            />

            {/* date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="" sx={{ width: "100%" }} maxDate={maxDate} />
              </DemoContainer>
            </LocalizationProvider>

            {/* Time */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Time myLabel="Start Time" />
              <Time myLabel="End Time" />
            </Box>

            {/* total time taken */}
            <Typography sx={{ mt: 2 }}>
              Total time taken to complete the task :
            </Typography>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
              }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  mt: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "#96989d",
                  "&:hover": {
                    background: "#393636",
                  },
                }}>
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  console.log({
                    category: project,
                    name: projectName,
                    description,
                  });

                  handleClose();
                }}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  mt: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#706cc3,#7c3aed)",
                  },
                }}>
                Add Project
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default FormModal;
