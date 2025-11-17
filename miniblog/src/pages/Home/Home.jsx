// CSS
import styles from './Home.module.css';

// Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

// Components

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..." 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.posts}>
        {(posts || []).map((post) => <PostDetail key={post.id} post={post} /> 
        )}
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/create" className="btn">Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
