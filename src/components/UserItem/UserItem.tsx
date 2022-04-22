import format from 'date-fns/format';
import React, { FC } from 'react';
import styles from './UserItem.module.scss';

interface UserItemProps {
  avatarUrl: string;
  userName: string;
  address: string;
  email: string;
  date: Date;
  onClickEdit: () => void;
}

export const UserItem: FC<UserItemProps> = ({
  avatarUrl,
  userName,
  address,
  date,
  email,
  onClickEdit,
}) => {
  return (
    <li className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={avatarUrl} alt={userName} className={styles.image} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{userName}</span>
        <span className={styles.date}>
          {format(new Date(date), 'dd MMMM yyyy')}
        </span>
        <span>{address}</span>
        <span>{email}</span>
      </div>
      <button type="button" className={styles.button} onClick={onClickEdit}>
        Edit
      </button>
    </li>
  );
};
