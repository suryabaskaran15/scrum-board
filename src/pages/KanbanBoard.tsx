import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks, useUpdateTask } from "../api/taskServices";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { Modal, Button } from "react-bootstrap";
import "../assets/styles/scrum.scss";
import { Task } from "../types/types";
import Loader from "../components/Loader";

const KanbanBoard = () => {
    const { data: fetchedTasks, isLoading } = useTasks();
    const updateTask = useUpdateTask();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const columns = ["To Do", "In Progress", "Done"];

    // Sync local state with fetched data
    useEffect(() => {
        if (fetchedTasks) {
            setTasks(fetchedTasks);
        }
    }, [fetchedTasks]);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const { draggableId, destination, source } = result;

        // Find the dragged task
        const draggedTaskIndex = tasks.findIndex((task) => task.id === draggableId);
        if (draggedTaskIndex === -1) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(draggedTaskIndex, 1); // Remove task
        movedTask.status = destination.droppableId; // Update status
        updatedTasks.splice(source.index, 0, movedTask); // Insert at new position

        // Update state optimistically
        setTasks(updatedTasks);

        // Send API request to persist the update
        updateTask.mutate({ id: draggableId, status: destination.droppableId });
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="kanban-container">
            <div className="kanban-header">
                <h1>Task Management</h1>
                <Button variant="primary" onClick={openModal}>
                    Add Task
                </Button>
            </div>

            {/* Bootstrap Modal */}
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Edit Task" : "Add New Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm onClose={closeModal} taskToEdit={taskToEdit} isEditMode={isEditMode} />
                </Modal.Body>
            </Modal>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-board">
                    {columns.map((status) => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                                    <h2>{status}</h2>
                                    <div className="tasks-container">
                                        {tasks
                                            ?.filter((task) => task.status === status)
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                                    {(provided) => (
                                                        <TaskCard
                                                            task={task}
                                                            provided={provided}
                                                            onEdit={handleEditTask}
                                                        />
                                                    )}
                                                </Draggable>
                                            ))}
                                        <div style={{ minHeight: "1px" }}>{provided.placeholder}</div>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;
