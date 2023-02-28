// Libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserSessionData} from '../interfaces/IAuthData';


// Constants
export const userKey = 'auth';


// Initial States
const initialState = {
  user: null,
  isLoggedIn: false,
  isLoadingStorageData: true,
  isLoggingOut: false,
  isSessionExpiredAndLoggingOut: false,
  isGuestMode: true,
};



// Load Storage 
const loadUserFromStorage = createAsyncThunk('user/loadFromStorage', () => {
  return AsyncStorage.getItem(userKey);
});


// Set Storage 

const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData) => {
    await AsyncStorage.setItem(userKey, JSON.stringify(userData));
    return userData;
  },
);

// Remove Storage 
const logOutUser = createAsyncThunk('userapi/user/logout', () => {
  return AsyncStorage.removeItem(userKey);
});


// Data Slices

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // use the builder pattern its easier to understand
  extraReducers: builder => {
    builder
      .addCase(loadUserFromStorage.fulfilled,
        (state, action) => {

          const {payload} = action;
          const user = payload;
          if (user) {
            state.isLoadingStorageData = false;
            state.isLoggedIn = true;
            state.user = user;
            state.isGuestMode = false;
          } else {
            state.isLoadingStorageData = false;
            state.isLoggedIn = false;
            state.user = null;
            state.isGuestMode = true;
          }
        },
      )
      .addCase(loginUser.fulfilled,
        (state, action) => {
          const {payload} = action;
          state.isLoggedIn = true;
          state.user = payload;
          state.isGuestMode = false;
        },
      )
      .addCase(loadUserFromStorage.rejected, 
        state => {
        state.isLoadingStorageData = false;
      })
      .addCase(logOutUser.fulfilled, 
        state => {
        state.isLoggedIn = false;
        state.user = null;
        state.isGuestMode = true;
      });
  },
});

// State Reducers
const userReducer = userSlice.reducer;




export {
  userReducer,
  loadUserFromStorage,
  logOutUser,
  loginUser,
};
