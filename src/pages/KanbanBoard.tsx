import { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks, useUpdateTask } from "../api/taskServices";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { Modal, Button } from "react-bootstrap";
import "../assets/styles/scrum.scss";
import { Task } from "../types/types";
import Loader from "../components/Loader";

const KanbanBoard = () => {
    const { data: tasks, isLoading } = useTasks();
    const [drafts , setDrafts] = useState<Task[]>([]);
    const formData= useRef<Task|null>(null);
    const updateTask = useUpdateTask();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const columns = ["To Do", "In Progress", "Done"];

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;
    
        const { draggableId, destination } = result;
        const draggedTask = tasks?.find((task) => task.id === draggableId);
        if (!draggedTask) return;
    
        // Update positions in the local array
        let updatedTasks = [...tasks!].filter((task) => task.id !== draggableId);
        updatedTasks.splice(destination.index, 0, { ...draggedTask, position: destination.index, status: destination.droppableId });
    
        // Assign new positions
        updatedTasks = updatedTasks.map((task, index) => ({ ...task, position: index }));
    
        // Send bulk update request
        await updateTask.mutateAsync(updatedTasks);
    };
    

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
        if(formData.current){

            setDrafts((prev)=>[...prev, {...formData.current!}]);
        }
        // formData.current = null;
        console.log(drafts);
    };

    const handleEditTask = (task: Task) => {
        const draft = drafts.find((datum)=>datum?.id == task.id);
        if(draft){
            setTaskToEdit({...draft , isDraft:true});
        }else{
            setTaskToEdit(task);
        }
        setIsEditMode(true);
        setIsModalOpen(true);

    };

    if (isLoading) return <Loader />;

    return (
        <div className="kanban-container">
            <div className="kanban-header">
                <h1>Task Management</h1>
                <Button variant="primary" onClick={openModal}>Add Task</Button>
            </div>

            {/* Bootstrap Modal */}
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Edit Task" : "Add New Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm onClose={closeModal} taskToEdit={taskToEdit} formData={formData} isEditMode={isEditMode} />
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
                                            .sort((a, b) => a.position - b.position) // Sort by position
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                                    {(provided) => (
                                                        <TaskCard task={task} provided={provided} onEdit={handleEditTask} />
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
