import styles from "./Search.module.css";
import { useQuery } from "../../hooks/useQuery";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q") || "";

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Resultados para: {search}</h1>
      <div className={styles.no_posts}>
        {posts && posts.length === 0 && (
        <div className={styles.no_posts}>
            <p>Não foram encontrados posts com essa tag</p>
            <Link to="/" className="btn btn-dark">
                Voltar
            </Link>
        </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
