import React from "react";
import { useTasks } from "../context/TaskContext";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Container,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

const TaskList: React.FC = () => {
    const { tasks, loading, error } = useTasks();

    return (
        <Container maxWidth="sm">


            {loading && (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}

            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id} divider>
                        <ListItemText
                            primary={task.title}
                            secondary={`Status: ${task.status}`}
                        />
                    </ListItem>
                ))}
            </List>

        </Container>
    );
};

export default TaskList;
