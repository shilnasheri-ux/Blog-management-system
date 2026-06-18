import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

export default function PostDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  const fetchPost = async () => {
    const res = await API.get(`/api/posts/${id}/`)
    setPost(res.data)
  }

  const fetchComments = async () => {
    const res = await API.get(`/api/posts/${id}/comments/`)
    setComments(res.data)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    try {
      await API.post(`/api/posts/${id}/comments/`, { content: newComment })
      setNewComment('')
      fetchComments()
    } catch {
      alert('Failed to add comment.')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await API.delete(`/api/posts/${id}/comments/${commentId}/`)
      setComments(comments.filter((c) => c.id !== commentId))
    } catch {
      alert('You can only delete your own comments.')
    }
  }

  const handleEditComment = async (commentId) => {
    try {
      await API.put(`/api/posts/${id}/comments/${commentId}/`, {
        content: editContent,
      })
      setEditingComment(null)
      fetchComments()
    } catch {
      alert('Failed to update comment.')
    }
  }

  if (!post) return <p style={{ padding: '30px' }}>Loading...</p>

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>📝 Blog Management</h2>
        <button style={styles.backBtn} onClick={() => navigate('/posts')}>
          ← Back to Posts
        </button>
      </div>

      <div style={styles.content}>
        {/* Post */}
        <div style={styles.postCard}>
          <h2 style={styles.postTitle}>{post.title}</h2>
          <p style={styles.postMeta}>by {post.author}</p>
          <p style={styles.postBody}>{post.content}</p>
        </div>

        {/* Comments */}
        <div style={styles.commentsSection}>
          <h3 style={styles.commentsTitle}>
            💬 Comments ({comments.length})
          </h3>

          {comments.length === 0 && (
            <p style={{ color: '#888' }}>No comments yet. Be the first!</p>
          )}

          {comments.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <div style={styles.commentHeader}>
                <span style={styles.commentAuthor}>👤 {comment.author}</span>
                <span style={styles.commentDate}>
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>

              {editingComment === comment.id ? (
                <div>
                  <textarea
                    style={styles.textarea}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div style={styles.commentActions}>
                    <button
                      style={styles.saveBtn}
                      onClick={() => handleEditComment(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      style={styles.cancelBtn}
                      onClick={() => setEditingComment(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={styles.commentBody}>{comment.content}</p>
                  {comment.author === user?.username && (
                    <div style={styles.commentActions}>
                      <button
                        style={styles.editBtn}
                        onClick={() => {
                          setEditingComment(comment.id)
                          setEditContent(comment.content)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add Comment */}
          <div style={styles.addComment}>
            <h4 style={{ marginBottom: '10px' }}>Add a Comment</h4>
            <textarea
              style={styles.textarea}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button style={styles.submitBtn} onClick={handleAddComment}>
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: {
    backgroundColor: '#4f46e5',
    padding: '14px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: { color: '#fff', margin: 0 },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  content: { maxWidth: '800px', margin: '30px auto', padding: '0 20px' },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  },
  postTitle: { color: '#1a1a2e', marginBottom: '6px' },
  postMeta: { color: '#888', fontSize: '14px', marginBottom: '16px' },
  postBody: { color: '#444', lineHeight: '1.8' },
  commentsSection: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  },
  commentsTitle: { marginBottom: '20px', color: '#1a1a2e' },
  commentCard: {
    borderLeft: '4px solid #4f46e5',
    padding: '12px 16px',
    marginBottom: '14px',
    backgroundColor: '#f8f8ff',
    borderRadius: '6px',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  commentAuthor: { fontWeight: '600', color: '#4f46e5', fontSize: '14px' },
  commentDate: { fontSize: '12px', color: '#aaa' },
  commentBody: { color: '#555', margin: '0 0 8px 0' },
  commentActions: { display: 'flex', gap: '8px', marginTop: '8px' },
  editBtn: {
    padding: '5px 12px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  deleteBtn: {
    padding: '5px 12px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  saveBtn: {
    padding: '5px 12px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  cancelBtn: {
    padding: '5px 12px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  addComment: { marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '20px' },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minHeight: '80px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
}