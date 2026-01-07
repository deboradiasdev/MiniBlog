import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchPost() {
      try {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          if (active) {
            setError("Post não encontrado");
            setLoading(false);
          }
          return;
        }
        if (active) {
          setPost({ id: snap.id, ...snap.data() });
          setError(null);
          setLoading(false);
        }
      } catch (e) {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      }
    }
    fetchPost();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <div className={styles.post}><p>Carregando...</p></div>;
  }
  if (error) {
    return <div className={styles.post}><p className="error">{error}</p></div>;
  }
  if (!post) {
    return <div className={styles.post}><p>Post não encontrado.</p></div>;
  }

  return (
    <div className={styles.post}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdby}>{post.createdBy}</p>
      <div className={styles.tags}>
        {(post.tagsArray || []).map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <p className={styles.body}>{post.body}</p>
    </div>
  );
};

export default Post;
