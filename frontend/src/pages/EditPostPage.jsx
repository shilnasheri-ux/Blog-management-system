import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    API.get(`/api/posts/${id}/`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/api/posts/${id}/`, {
        title,
        content,
      });

      alert("Post updated successfully!");
      navigate("/posts");
    } catch (err) {
      console.log(err);
      alert("Error updating post");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>✏️ Edit Blog Post</h1>
        <p style={styles.subtitle}>
          Update your post and save the changes.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Content</label>
            <textarea
              style={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Update your content..."
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

            <button type="submit" style={styles.button}>
              Update Post
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
    background: "#f5f7fb",
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

  title: {
    marginBottom: "10px",
    color: "#1f2937",
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
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
  },

  button: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  cancelButton: {
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default EditPostPage;