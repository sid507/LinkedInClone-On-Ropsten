import {  createSlice } from '@reduxjs/toolkit';
import { auth } from '../Firebase';





export const userSlice = createSlice({
  name: "user",
  initialState:{
    user:null,
  },
  reducers: {
    logIn: (state,action) => {
     
      state.user = action.payload;
    },
 
    logout: (state) => {
      state.user=null;
      auth.signOut();
    },
  },
  
});

export const { logIn,logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.counter.user;


export default userSlice.reducer;
