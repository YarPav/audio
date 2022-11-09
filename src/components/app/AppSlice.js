import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const initialState = {
    currentTrackUrl: 'empty',
    currentTrackVolume: 0.01,
    isTrackPlaying: false,
    tracksLoadingStatus: 'idle',
    tracks: [],
    searchResult: []
}

export const fetchTracks = createAsyncThunk(
    'app/fetchTracks',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/tracks');
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentTrackUrl: (state, action) => {
            state.currentTrackUrl = action.payload;
        },
        setCurrentTrackVolume: (state, action) => {
            state.currentTrackVolume = action.payload;
        },
        trackAdded: (state, action) => {
            state.tracks.push(action.payload);
        },
        setIsTrackPlaying: (state, action) => {
            state.isTrackPlaying = action.payload;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchTracks.pending, state => {state.tracksLoadingStatus = 'loading'})
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.tracksLoadingStatus = 'idle'
                state.tracks = action.payload
            })
            .addCase(fetchTracks.rejected, state => state.tracksLoadingStatus = 'error')
            .addDefaultCase(() => {});
    })
});

const {actions, reducer} = appSlice;

export default reducer;
export const {
    setCurrentTrackUrl,
    setCurrentTrackVolume,
    setIsTrackPlaying,
    setSearchResult
} = actions;
