import React, { FC } from 'react';
import styles from './List.module.scss';

interface ListProps {
  children: React.ReactNode;
}

export const List: FC<ListProps> = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};
