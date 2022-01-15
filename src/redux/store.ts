import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {RootData, rootSlice} from './reducers';

type RootStore = EnhancedStore<RootData>;

export const store = configureStore({
    reducer: rootSlice.reducer
}) as any as RootStore;
