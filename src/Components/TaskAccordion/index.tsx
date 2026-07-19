import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Task } from "../types";

interface Props {
  tasks: Record<string, Task[]>;
}
function TaskAccordion({ tasks }: Props) {
  return (
    <>
      {Object.entries(tasks).map(([date, dateTasks]) => (
        <Accordion
          key={date}
          sx={{
            mb: 2,
            borderRadius: 2,
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>{date}</Typography>

            <Typography
              sx={{
                ml: 2,
                color: "gray",
              }}>
              ({dateTasks.length} Tasks)
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {dateTasks.map((task) => (
              <Box
                key={task.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  background: "#f5f5f5",
                }}>
                <Typography>
                  <b>Category:</b>
                  {task.category.charAt(0).toUpperCase() +
                    task.category.slice(1)}
                </Typography>
                <Typography>
                  <b>Description:</b> {task.description}
                </Typography>

                <Typography>
                  <b>Time Taken:</b> {task.timeTaken}
                </Typography>

                <Chip
                  label={task.status}
                  color={task.status === "Completed" ? "success" : "warning"}
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default TaskAccordion;
