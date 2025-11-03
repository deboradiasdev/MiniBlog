import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h3>Blog desenvolvido por [Débora Dias]</h3>
            <p>© 2025 Mini Blog. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;