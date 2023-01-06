import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a href={'https://linkedin.com/in/santco'}>linkedin.com/in/santco</a> -{' '}
        <a href={'https://github.com/santjc'}>github.com/santjc</a>
      </p>
    </footer>
  );
}
