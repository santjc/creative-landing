import styles from './SuspenseFallback.module.scss';

export default function SuspenseFallback() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading</h1>
    </div>
  );
}
