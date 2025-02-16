import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useAddTask, useEditTask } from "../api/taskServices";
import { Task, TaskStatus, User } from "../types/types";
import apiClient from "../api/api";

interface TaskFormProps {
    taskToEdit: Task | null;
    isEditMode: boolean;
    onClose: () => void;
}

const TaskForm = ({ taskToEdit, isEditMode, onClose }: TaskFormProps) => {
    const [users, setUsers] = useState<User[]>([]);

    const addTask = useAddTask();
    const editTask = useEditTask();

    // Fetch users on component mount
    useEffect(() => {
        apiClient.get("/users")
            .then((response) => {
                setUsers(response.data);
            });
    }, []);

    // Form validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().required("Task title is required"),
        description: Yup.string(),
        assignee: Yup.string().nullable(),
        status: Yup.string().required(),
    });

    return (
        <Formik
            initialValues={{
                title: taskToEdit?.title || "",
                description: taskToEdit?.description || "",
                assignee: taskToEdit?.assignee?.id.toString() || "0", // Convert ID to string
                status: taskToEdit?.status || "To Do",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                const taskData = {
                    id: taskToEdit?.id, // Include ID only if editing
                    title: values.title,
                    description: values.description,
                    assignee: values.assignee === "0" ? null : users.find(user => user.id.toString() === values.assignee),
                    status: values.status as TaskStatus,
                };

                if (isEditMode && taskToEdit) {
                    editTask.mutate(taskData as Task);
                } else {
                    addTask.mutate(taskData);
                }

                resetForm();
                onClose();
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    {/* Task Title */}
                    <div className="mb-3">
                        <label className="form-label">Task Title</label>
                        <Field type="text" name="title" className="form-control" placeholder="Enter task title" />
                        <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <Field as="textarea" name="description" className="form-control" rows={3} placeholder="Enter task description" />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>

                    {/* Assignee */}
                    <div className="mb-3">
                        <label className="form-label">Assignee</label>
                        <Field as="select" name="assignee" className="form-select">
                            <option value="0">Unassigned</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id.toString()}>
                                    {user.name}
                                </option>
                            ))}
                        </Field>
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <Field as="select" name="status" className="form-select">
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </Field>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <Button variant="primary" type="submit">
                        {isEditMode ? "Save Changes" : "Add Task"}
                    </Button>
                    <Button variant="secondary" onClick={onClose} className="ms-2">
                        Cancel
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default TaskForm;
