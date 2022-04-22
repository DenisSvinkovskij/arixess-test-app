import React from 'react';
import styles from './App.module.scss';
import { AppRouting } from './routes/Routing';

function App() {
  return (
    <div className={styles.appContainer}>
      <AppRouting />
    </div>
  );
}

export default App;
