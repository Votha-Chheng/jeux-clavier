import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import ecrisLeMotReducer from './slices/ecrisLeMotSlice';
import optionsPanelReducer from './slices/optionsPanelSlice';
import trouveLaLettreSlice from './slices/trouveLaLettreSlice';
import { createWrapper } from 'next-redux-wrapper';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import customListArrayReducer from './slices/customListArray';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const reducers = combineReducers({
  ecrisLeMot: ecrisLeMotReducer,
  optionsPanel: optionsPanelReducer,
  trouveLaLettre: trouveLaLettreSlice,
  customListArray: customListArrayReducer
})

const persistConfig = {
  key: 'root',
  storage: typeof window === "undefined" ? createNoopStorage() : createWebStorage('local'),
  whitelist: ['customListArray']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = ()=> {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  })
}

export const wrapper = createWrapper(store)

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;