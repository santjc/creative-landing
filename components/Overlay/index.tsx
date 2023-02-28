import Menu from '@components/Menu';

import styles from './Overlay.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function Overlay({ children }: Props) {
  return (
    <div className={styles.overlay}>
      <Menu />
      <div className={styles.content}>
        <>{children}</>
      </div>
    </div>
  );
}
