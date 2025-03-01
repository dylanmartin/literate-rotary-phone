import React from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";
import { Container, Grid, Paper, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 2 }}>

        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {/* Task Form (Fixed) */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <TaskForm />
            </Paper>
          </Grid>

          {/* Task List (Scrollable) */}
          <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column" }}>
            <Paper elevation={3} sx={{ flexGrow: 1, maxHeight: "70vh", overflowY: "auto", padding: 2 }}>
              <TaskList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </TaskProvider>
  );
};

export default App;
