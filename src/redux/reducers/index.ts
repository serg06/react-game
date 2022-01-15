import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface RootData {
    paused: boolean;
}

const initialState: RootData = {
    paused: false
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        reset: () => initialState,
        update: (state, action: PayloadAction<Partial<RootData>>) => {
            Object.assign(state, action.payload);
        }
    }
});
