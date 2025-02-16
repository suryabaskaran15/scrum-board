# Scrum Board  

A web-based Scrum Board application that allows teams to manage tasks, track progress, and visualize workflows using an interactive Kanban board.  

---

## 🚀 Features  

✅ **Drag-and-Drop Task Management** – Move tasks across different columns seamlessly.  
✅ **Customizable Columns** – Define custom workflow stages (e.g., To Do, In Progress, Done).  
✅ **Task Prioritization** – Assign priority levels to tasks for better organization.  
✅ **Real-Time Updates** – Instant task updates and state changes.  
✅ **Responsive Design** – Optimized for all screen sizes.  

---

## 🛠 Technologies Used  

| Technology         | Purpose |
|-------------------|---------|
| **React**         | Frontend framework for UI |
| **TypeScript**    | Adds static typing for better code quality |
| **React DnD**     | Drag-and-drop functionality |
| **Axios**         | API communication |
| **CSS**          | Custom styling |

---

## 📌 Setup Instructions  

### 🛑 Prerequisites  
Ensure you have the following installed:  
- **Node.js** (Download from [Node.js Official Website](https://nodejs.org/))  
- **npm** (Bundled with Node.js)  

---

### 📥 Installation  

1️⃣ **Clone the repository:**  
```sh
git clone https://github.com/suryabaskaran15/scrum-board.git
cd scrum-board
```

# Install dependencies:
```
npm install
```

# Run the DB server:
```
npx json-server --watch db.json --port 5000
```

OR

```
npm run start:DB
```

# Run the development server:
```
npm run dev
```
# Open the app:

Visit http://localhost:5173 in your browser.


# Available Scripts
npm run dev: Runs the app in development mode.

npm run build: Builds the app for production.

# Project Structure
```
scrum-board/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, styles, etc.
│   ├── components/          # Reusable components
│   │   ├── TaskCard/        # Individual task component
│   │   └── Loader/          # Loading spinner component
│   ├── context/             # React Context API (if used)
│   ├── router/              # Application router
│   ├── pages/               # Page of the application
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point
│   └── react-app-env.d.ts   # TypeScript declarations
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration
```

License
This project is licensed under the MIT License. See the LICENSE file for details.