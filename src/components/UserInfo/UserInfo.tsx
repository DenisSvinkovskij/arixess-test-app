import format from 'date-fns/format';
import React, { FC } from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  avatarUrl: string;
  userName: string;
  date: Date;
  onClickDelete: () => void;
}

export const UserInfo: FC<UserInfoProps> = ({
  avatarUrl,
  userName,
  date,
  onClickDelete,
}) => {
  return (
    <>
      <div className={styles.topInfo}>
        <div className={styles.imgContainer}>
          <img src={avatarUrl} alt={userName} className={styles.image} />
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{userName}</span>
          <span className={styles.date}>
            {format(new Date(date), 'dd MMMM yyyy')}
          </span>
        </div>
      </div>
      <button type="button" className={styles.button} onClick={onClickDelete}>
        Delete
      </button>
    </>
  );
};
