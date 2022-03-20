import styles from './Circle.module.css';

export const rem = (px: number): string => `${px / 16}rem`;

interface CircleProps {
  color: string;
  size?: number;
}

export const Circle = ({ color, size = 16 }: CircleProps) => {
  return (
    <div
      className={styles.circle}
      style={{ background: color, height: rem(size), width: rem(size) }}
    />
  );
};
