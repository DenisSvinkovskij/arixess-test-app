import { configureStore } from '@reduxjs/toolkit';
import { usersSliceReducer } from './users/usersSlice';
import { currentUserSliceReducer } from './users/currentUserSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'currentUser',
  storage,
};

const persistedCurrentUserReducer = persistReducer(
  persistConfig,
  currentUserSliceReducer,
);

export const store = configureStore({
  reducer: {
    usersReducer: usersSliceReducer,
    currentUserReducer: persistedCurrentUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
