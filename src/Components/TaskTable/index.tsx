//code for displaying tasks in the table
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Chip,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Task } from "../types";
interface Props {
  tasks: Task[];
  // completeTask: (id: number) => void;
  handleEdit: (task: Task) => void;
  deleteTask: (id: number) => void;
  handleView: (task: Task) => void;
}

function TaskTable({
  tasks,
  // completeTask,
  handleEdit,
  deleteTask,
  handleView,
}: Props) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
      }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
              "& th": {
                color: "#fff",
                fontWeight: 700,
              },
            }}>
            <TableCell>S.No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>

            <TableCell>Task</TableCell>

            <TableCell>Description</TableCell>

            <TableCell>Time Taken</TableCell>

            {/* <TableCell>Status</TableCell> */}

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task.id} hover>
              <TableCell sx={{ fontWeight: "bold" }}>{index + 1}</TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }}>{task.date}</TableCell>
              <TableCell>
                {task.category === "assignment" ? "Assignment" : "Learning"}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                {task.name}
              </TableCell>

              <TableCell>
                <Typography
                  sx={{
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  {task.description}
                </Typography>
              </TableCell>

              <TableCell>{task.timeTaken}</TableCell>

              {/* <TableCell>
                <Chip
                  label={task.status}
                  color={task.status === "Completed" ? "success" : "warning"}
                />
              </TableCell> */}

              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  {/* <IconButton
                    color="success"
                    onClick={() => completeTask(task.id)}
                    disabled={task.status === "Completed"}>
                    <CheckCircleIcon />
                  </IconButton> */}

                  <IconButton color="primary" onClick={() => handleEdit(task)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => deleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>

                  <IconButton color="info" onClick={() => handleView(task)}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
