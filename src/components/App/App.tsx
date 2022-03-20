import { Game } from 'components/Game';
import { Logo } from 'components/Logo';
import { SettingsModal } from 'components/SettingsModal';

import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
      </header>
      <div className={styles.view}>
        <Game />
      </div>
      <SettingsModal />
    </div>
  );
};
