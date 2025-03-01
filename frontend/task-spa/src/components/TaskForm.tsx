import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCreateDTO, TaskStatus } from "../types/Task";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Container,
    Paper,
    Typography,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";

const TaskForm: React.FC = () => {
    const { createTask, loading, error, success } = useTasks();
    const [task, setTask] = useState<TaskCreateDTO>({
        title: "",
        description: "",
        status: "PENDING",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const isSuccess = await createTask(task);
        if (isSuccess) {
            setTask({ title: "", description: "", status: "PENDING" });
        }
    };

    return (
        <Container maxWidth="sm">

            <Typography variant="h5" gutterBottom>
                Create Task
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={task.title}
                        onChange={(e: any) => setTask({ ...task, title: e.target.value })}
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        value={task.description}
                        onChange={(e: any) =>
                            setTask({ ...task, description: e.target.value })
                        }
                    />
                </Box>

                <Box mb={2}>
                    <Select
                        value={task.status}
                        onChange={(e: any) =>
                            setTask({ ...task, status: e.target.value as TaskStatus })
                        }
                        fullWidth
                    >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                    </Select>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Task"}
                </Button>
            </form>


            {/* Success/Error Messages */}
            <Snackbar open={!!success} autoHideDuration={3000}>
                <Alert severity="success">{success}</Alert>
            </Snackbar>
            <Snackbar open={!!error} autoHideDuration={3000}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Container>
    );
};

export default TaskForm;
