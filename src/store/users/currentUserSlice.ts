import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/user';

const initialState: User = {
  gender: '',
  name: {
    title: '',
    first: '',
    last: '',
  },
  location: {
    street: {
      number: 0,
      name: '',
    },
    city: '',
    state: '',
    postcode: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    timezone: {
      offset: '',
      description: '',
    },
  },
  email: '',
  login: {
    uuid: '',
    username: '',
    password: '',
    salt: '',
    md5: '',
    sha1: '',
    sha256: '',
  },
  dob: {
    date: '1997-07-28T01:53:12.260Z' as unknown as Date,
    age: 0,
  },
  registered: {
    date: '1997-07-28T01:53:12.260Z' as unknown as Date,
    age: 0,
  },
  phone: '',
  cell: '',
  id: {
    name: '',
    value: '',
  },
  picture: {
    large: '',
    medium: '',
    thumbnail: '',
  },
  nat: '',
};

export const currentUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserData: (state, action: PayloadAction<User>) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    clearCurrentUserData: state => {
      return (state = initialState);
    },

    updateName: (state, action: PayloadAction<string>) => {
      const [first, last] = action.payload.split(' ');
      return (state = {
        ...state,
        name: {
          ...state.name,
          first,
          last: last ?? '',
        },
      });
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      return (state = {
        ...state,
        email: action.payload,
      });
    },
    updatePhone: (state, action: PayloadAction<string>) => {
      return (state = {
        ...state,
        phone: action.payload,
      });
    },
    updateCity: (state, action: PayloadAction<string>) => {
      return (state = {
        ...state,
        location: {
          ...state.location,
          city: action.payload,
        },
      });
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      const addressArr: string[] = action.payload.split(' ');
      const number = addressArr.length > 0 ? Number(addressArr.pop()) : 0;
      return (state = {
        ...state,
        location: {
          ...state.location,
          street: {
            name: addressArr.join(' '),
            number,
          },
        },
      });
    },
    updateDate: (state, action: PayloadAction<Date>) => {
      return (state = {
        ...state,
        dob: {
          ...state.dob,
          date: action.payload,
        },
      });
    },
  },
});

export const {
  clearCurrentUserData,
  setCurrentUserData,
  updateAddress,
  updateCity,
  updateDate,
  updateEmail,
  updateName,
  updatePhone,
} = currentUserSlice.actions;

export const currentUserSliceReducer = currentUserSlice.reducer;
