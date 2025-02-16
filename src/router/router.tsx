import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KanbanBoard from "../pages/KanbanBoard";
import NotFoundPage from "../pages/NotFoundPage";

export enum ROUTES {
    HOME = "/",
}

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<KanbanBoard />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
