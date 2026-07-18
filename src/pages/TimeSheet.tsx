// import React from 'react'
import { useState } from "react";
import {} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormModal from "../Components/FormModal";
import TaskTable from "../Components/TaskTable";

function TimeSheet() {
  //tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <Box
        sx={{
          maxWidth: 900,
          margin: "40px auto",
          padding: 3,
        }}>
        <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4">
          Time Sheet Management
        </Typography>
        <FormModal />
        {/* table starts */}
        {tasks.length === 0 ? (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            No Tasks Available
          </Typography>
        ) : (
          <TaskTable />
        )}
        {/* table ends*/}
      </Box>
    </>
  );
}

export default TimeSheet;
