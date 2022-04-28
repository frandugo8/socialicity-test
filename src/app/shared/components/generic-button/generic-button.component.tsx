
import styles from './generic-button.module.scss';

interface GenericButtonProps {
  text: string
  style?: React.CSSProperties
  handleClick(): void
}

export default function GenericButtonComponent({text, style, handleClick}: GenericButtonProps) {
  return (
    <button style={style} type="button" className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}
