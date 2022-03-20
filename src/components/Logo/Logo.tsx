import { observer } from 'mobx-react-lite';
import { useGameInfo } from 'stores/hooks';

import styles from './Logo.module.css';

export interface LogoProps {
  winNumber: number;
}

export const Logo = observer(() => {
  const winNumber = useGameInfo().winNumber;

  return (
    <h1 className={styles.container}>
      <span className={styles.prefix}>Connect </span>
      <span className={styles.winNumber}>{winNumber}</span>
    </h1>
  );
});
