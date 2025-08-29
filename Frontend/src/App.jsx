import { Routes, Route, Navigate } from "react-router";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import ProceduresPage from "./pages/ProceduresPage/ProceduresPage";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
          </Route> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/procedures" element={<ProceduresPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
