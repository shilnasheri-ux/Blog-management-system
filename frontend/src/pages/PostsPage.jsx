import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    API.get("/api/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/api/posts/${id}/`);

    alert("Post deleted!");

    setPosts(posts.filter((post) => post.id !== id));
  } catch (err) {
    console.log(err);
    alert("Error deleting post");
  }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Blog Posts</h1>

      <div style={styles.topBar}>
  <h3>Welcome, {user?.username}</h3>

  <button
    style={styles.logoutButton}
    onClick={logout}
  >
    Logout
  </button>
</div>

      <button
        style={styles.createButton}
        onClick={() => navigate("/create")}
        >
        + Create Post
    </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h2>{post.title}</h2>
            <p>
              <b>Author:</b> {post.author}
            </p>
            <p>{post.content}</p>
            {post.author === user?.username && (
            <>
                <button
                onClick={() => navigate(`/edit/${post.id}`)}
                style={styles.button}
                >
                Edit
                </button>

                <button
                onClick={() => handleDelete(post.id)}
                style={styles.deleteButton}
                >
                Delete
                </button>
            </>
            )}
            <button
                onClick={() => navigate(`/post/${post.id}`)}
                style={styles.button}
                >
                View
            </button>

          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

    button: {
    padding: "8px 15px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },

    deleteButton: {
    padding: "8px 15px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },

    createButton: {
    padding: "10px 20px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  topBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
},

logoutButton: {
  padding: "10px 20px",
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
},
};

export default PostsPage;