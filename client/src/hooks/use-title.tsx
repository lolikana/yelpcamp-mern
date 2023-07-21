import { useEffect } from 'react';

const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return;
};

export default useTitle;
