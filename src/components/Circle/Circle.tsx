import styles from './Circle.module.css';

export const Circle = ({ color }: { color: string }) => {
  return <div className={styles.container} style={{ background: color }} />;
};
