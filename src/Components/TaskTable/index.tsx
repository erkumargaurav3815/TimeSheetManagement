//table containing all tasks
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
function TaskTable() {
  return (
    <>
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
                  fontSize: 15,
                },
              }}>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Time Taken</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              hover
              sx={{
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}>
              <TableCell>ID</TableCell>

              <TableCell>Date</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Task</TableCell>

              <TableCell sx={{ maxWidth: 280 }}>
                <Typography variant="body2" noWrap>
                  Description
                </Typography>
              </TableCell>

              <TableCell>Time Taken</TableCell>

              <TableCell>
                <Chip
                  // label={task.completed ? "Completed" : "Pending"}
                  // color={task.completed ? "success" : "warning"}
                  variant="filled"
                  size="small"
                />
                Status
              </TableCell>

              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                  }}>
                  <IconButton color="success">
                    <CheckCircleIcon />
                  </IconButton>

                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <VisibilityIcon color="info" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TaskTable;
