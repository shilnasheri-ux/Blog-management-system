import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/posts/", {
        title,
        content,
      });

      alert("Post created successfully!");

      navigate("/posts");
    } catch (err) {
      console.log(err);
      alert("Error creating post");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 Create New Post</h1>
        <p style={styles.subtitle}>
          Share your ideas with the community.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Content</label>
            <textarea
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/posts")}
            >
              Cancel
            </button>

            <button type="submit" style={styles.submitButton}>
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "700px",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "10px",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "30px",
  },

  group: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "180px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  cancelButton: {
    padding: "12px 25px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  submitButton: {
    padding: "12px 25px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default CreatePostPage;