import styles from './MenuButton.module.scss';

interface Props {
  text: string;
}
const MenuButton = ({ text }: Props) => {
  return (
    <div className={styles.buttonContainer}>
      <span className={styles.mas}>
        <p>{text}</p>
      </span>
      <button type="button" name="Hover">
        <p>{text}</p>
      </button>
    </div>
  );
};
export default MenuButton;
