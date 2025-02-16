import { Button, Toast, ToastContainer } from "react-bootstrap";
import { FaEdit, FaCopy } from "react-icons/fa";
import { useState } from "react";
import "../assets/styles/card.scss";
import { Task } from "../types/types";

interface TaskCardProps {
  task: Task;
  provided: any;
  onEdit: (task: Task) => void;
}

// Function to generate a consistent random color from a string
const getRandomColor = (name: string | undefined) => {
  if (!name) return "#ccc"; // Default gray color for unassigned
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 70%)`; // Generate HSL color
  return color;
};

const TaskCard = ({ task, provided, onEdit }: TaskCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const assigneeName = task.assignee?.name || "Unassigned";
  const assigneeInitial = assigneeName.charAt(0).toUpperCase();
  const bgColor = getRandomColor(task.assignee?.name);

  // Function to copy card ID to clipboard
  const handleCopyCardId = () => {
    navigator.clipboard.writeText(`CARD-${task.id}`).then(() => {
      setShowToast(true); // Show toast notification
      setTimeout(() => setShowToast(false), 3000); // Hide after 3 sec
    });
  };

  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="task-card"
      >
        <div className="scrum-card">
          <div className="card-header">
            <h3 className="card-title">{task.title}</h3>
            <span className="card-id" onClick={handleCopyCardId} style={{ cursor: "pointer" }}>
              #{`CARD-${task.id}`} <FaCopy style={{ marginLeft: "5px" }} />
            </span>
          </div>
          <p className="card-description">{task.description}</p>
          <div className="card-footer">
            {/* Assignee Circle Avatar */}
            <div className="assignee-avatar" style={{ backgroundColor: bgColor }}>
              {assigneeInitial}
            </div>
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(task)}>
              <FaEdit /> {/* Edit icon */}
            </Button>
          </div>
        </div>
      </div>

      {/* Bootstrap Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body>Card ID copied to clipboard!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default TaskCard;
