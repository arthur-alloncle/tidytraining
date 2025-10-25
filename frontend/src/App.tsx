import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ProjectsPage from "@/pages/projects";
import ProjectPage from "@/pages/project";
import { RegisterPage } from "./pages/register";
import { UserProfilePage } from "./pages/userProfile";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      {/* Projets */}
      <Route element={<ProjectsPage />} path="/projets" />
      <Route element={<ProjectPage />} path="/projet/:id" />
      {/* Utilisateurs */}
      <Route element={<RegisterPage />} path='/inscription' />
      <Route element={<UserProfilePage />} path='/me' />
      <Route element={<LoginPage />} path='/login' />
    </Routes>
  );
}

export default App;
