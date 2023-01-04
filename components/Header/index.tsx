import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo}>Logo.</a>
      <nav>
        <a className={styles.menuOption}>About</a>
        <a className={styles.menuOption}>Contact</a>
      </nav>
    </header>
  );
}
