import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  clearCurrentUserData,
  updateAddress,
  updateCity,
  updateDate,
  updateEmail,
  updateName,
  updatePhone,
} from '../../store/users/currentUserSlice';
import Arrow from '../../assets/svg/white-arrow.svg';

import styles from './UserPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { EditInput } from '../../components/EditInput/EditInput';
import { format } from 'date-fns';

export const UserPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, dob, picture, email, phone, location } = useAppSelector(
    state => state.currentUserReducer,
  );

  const [userName, setUserName] = useState({
    value: `${name.first} ${name.last}`,
    inputType: 'text',
    name: 'user-name',
  });

  const [emailState, setEmailState] = useState({
    value: email,
    inputType: 'text',
    name: 'email',
  });

  const [phoneState, setPhoneState] = useState({
    value: phone,
    inputType: 'text',
    name: 'phone',
  });

  const [cityState, setCityState] = useState({
    value: location.city,
    inputType: 'text',
    name: 'city',
  });

  const [address, setAddress] = useState({
    value: `${location.street.name} ${location.street.number}`,
    inputType: 'text',
    name: 'address',
  });

  const [date, setDate] = useState({
    value: format(new Date(dob.date), 'dd MMMM yyyy'),
    inputType: 'text',
    name: 'date',
  });

  const [disabledValue, setDisabledValue] = useState({
    'user-name': true,
    email: true,
    phone: true,
    city: true,
    address: true,
    date: true,
  });

  const onChangeValueUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(prev => ({ ...prev, value: e.target.value }));
  };

  const onChangeValueEmailState = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailState(prev => ({ ...prev, value: e.target.value }));
  };

  const onChangeValuePhoneState = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneState(prev => ({ ...prev, value: e.target.value }));
  };

  const onChangeValueCityState = (e: ChangeEvent<HTMLInputElement>) => {
    setCityState(prev => ({ ...prev, value: e.target.value }));
  };

  const onChangeValueAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, value: e.target.value }));
  };

  const onChangeValueDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(prev => ({ ...prev, value: e.target.value }));
  };

  const onClickButton = (e: SyntheticEvent) => {
    // ? buttons have names but typescript don't see
    // @ts-ignore
    if (!disabledValue[e.target.name]) {
      // @ts-ignore
      switch (e.target.name) {
        case 'user-name':
          if (!userName.value) {
            return;
          }
          dispatch(updateName(userName.value));
          break;

        case 'email':
          if (!emailState.value) {
            return;
          }
          dispatch(updateEmail(emailState.value));
          break;

        case 'phone':
          if (!phoneState.value) {
            return;
          }
          dispatch(updatePhone(phoneState.value));
          break;

        case 'city':
          if (!cityState.value) {
            return;
          }
          dispatch(updateCity(cityState.value));
          break;

        case 'address':
          if (!address.value) {
            return;
          }
          dispatch(updateAddress(address.value));
          break;

        case 'date':
          if (!date.value) {
            return;
          }
          dispatch(
            updateDate(new Date(date.value).toISOString() as unknown as Date),
          );
          break;

        default:
          break;
      }
    }

    setDisabledValue(prev => ({
      ...prev,
      // @ts-ignore
      [e.target.name]: !prev[e.target.name],
    }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearCurrentUserData);
    };
  }, [dispatch]);

  const onClickDelete = () => {
    // ? here we have to make a request to the API to delete the user, but the API does not support this
    navigate('/');
  };

  const getBtnTitle = useCallback(disabled => {
    return disabled ? 'Edit' : 'Update';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/')}
        >
          <img src={Arrow} alt="go back" className={styles.arrowBack} />
          Go Back
        </button>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.mainInfo}>
          <UserInfo
            avatarUrl={picture.large}
            userName={`${name.first} ${name.last}`}
            date={dob.date}
            onClickDelete={onClickDelete}
          />
        </div>
        <div className={styles.editContainer}>
          <EditInput
            btnTitle={getBtnTitle(disabledValue['user-name'])}
            disabled={disabledValue['user-name']}
            inputType={userName.inputType}
            name={userName.name}
            onButtonClick={onClickButton}
            onChange={onChangeValueUserName}
            value={userName.value}
          />
          <EditInput
            btnTitle={getBtnTitle(disabledValue.email)}
            disabled={disabledValue.email}
            inputType={emailState.inputType}
            name={emailState.name}
            onButtonClick={onClickButton}
            onChange={onChangeValueEmailState}
            value={emailState.value}
          />
          <EditInput
            btnTitle={getBtnTitle(disabledValue.phone)}
            disabled={disabledValue.phone}
            inputType={phoneState.inputType}
            name={phoneState.name}
            onButtonClick={onClickButton}
            onChange={onChangeValuePhoneState}
            value={phoneState.value}
          />
          <EditInput
            btnTitle={getBtnTitle(disabledValue.city)}
            disabled={disabledValue.city}
            inputType={cityState.inputType}
            name={cityState.name}
            onButtonClick={onClickButton}
            onChange={onChangeValueCityState}
            value={cityState.value}
          />
          <EditInput
            btnTitle={getBtnTitle(disabledValue.address)}
            disabled={disabledValue.address}
            inputType={address.inputType}
            name={address.name}
            onButtonClick={onClickButton}
            onChange={onChangeValueAddress}
            value={address.value}
          />{' '}
          <EditInput
            btnTitle={getBtnTitle(disabledValue.date)}
            disabled={disabledValue.date}
            inputType={date.inputType}
            name={date.name}
            onButtonClick={onClickButton}
            onChange={onChangeValueDate}
            value={date.value}
          />
        </div>
      </div>
    </div>
  );
};
