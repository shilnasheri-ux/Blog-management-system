import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;