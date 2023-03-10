import Menu from '@components/Menu';

import styles from './Overlay.module.scss';

type Props = {
  children: React.ReactNode;
  menu?: boolean;
  background?: string | 'transparent';
};

export default function Overlay({ children, menu = true, background }: Props) {
  return (
    <div className={styles.overlay} style={{ background: background }}>
      {menu && <Menu />}
      <div className={styles.content}>
        <>{children}</>
      </div>
    </div>
  );
}
