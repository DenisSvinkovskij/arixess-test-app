import React, { FC } from 'react';
import InputRange from 'react-input-range';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  onChangeFilterAge,
  onChangeFilterGender,
  onChangeFilterName,
  onChangeSortType,
} from '../../store/users/usersSlice';
import 'react-input-range/lib/css/index.css';
import { Range } from '../../types/shared';
import styles from './Filter.module.scss';
import './RangeRestyle.scss';

interface FilterProps {}

export const Filter: FC<FilterProps> = () => {
  const sort = useAppSelector(state => state.usersReducer.sort);
  const filter = useAppSelector(state => state.usersReducer.filter);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          value={filter.name}
          onChange={e => {
            dispatch(onChangeFilterName(e.target.value));
          }}
          className={styles.input}
          placeholder="Search by name"
        />
      </label>
      <label className={styles.label}>
        Age
        <InputRange
          maxValue={70}
          minValue={1}
          value={filter.age}
          onChange={value => {
            dispatch(onChangeFilterAge(value as Range));
          }}
        />
        <div className="">
          {filter.age.min}-{filter.age.max}
        </div>
      </label>
      <div className={styles.label}>
        Gender
        <div className={styles.genderContainer}>
          <button
            type="button"
            onClick={() => {
              dispatch(onChangeFilterGender('male'));
            }}
            className={`${styles.genderBtn} ${
              filter.gender === 'male' ? styles.active : ''
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(onChangeFilterGender('female'));
            }}
            className={`${styles.genderBtn} ${
              filter.gender === 'female' ? styles.active : ''
            }`}
          >
            Female
          </button>
        </div>
      </div>

      <label className={styles.label}>
        <span>Sort By </span>
        <select
          value={sort.type}
          onChange={e => {
            dispatch(onChangeSortType(e.target.value));
          }}
          className={styles.select}
        >
          <option value="" disabled>
            -----
          </option>
          <option value="name">Name</option>
          <option value="date of birth">Date of birth</option>
          <option value="city">City</option>
          <option value="custom sort">Custom sort</option>
        </select>
      </label>
    </div>
  );
};
