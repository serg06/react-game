import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface RootData {
    paused: boolean;
    position: [number, number, number];
}

const initialState: RootData = {
    paused: false,
    position: [0, 0, 0]
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
