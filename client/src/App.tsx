import { useRef } from 'react';

import styles from './App.module.scss';
import useTitle from './hooks/use-title';

function App() {
  const headTitleRef = useRef<string>('HOMEPAGE');
  useTitle(headTitleRef.current);

  return (
    <>
      <h1 className={styles.title}>{headTitleRef.current}</h1>
    </>
  );
}

export default App;
