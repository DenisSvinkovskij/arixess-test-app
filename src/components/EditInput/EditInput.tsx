import React, { ChangeEvent, FC, MouseEvent } from 'react';
import styles from './EditInput.module.scss';

interface EditInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType: string;
  name: string;
  disabled: boolean;
  btnTitle: string;
  onButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const EditInput: FC<EditInputProps> = ({
  inputType,
  btnTitle,
  disabled,
  onChange,
  name,
  value,
  onButtonClick,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className={styles.input}
      />
      <button
        type="button"
        className={styles.button}
        onClick={onButtonClick}
        name={name}
      >
        {btnTitle}
      </button>
    </div>
  );
};
