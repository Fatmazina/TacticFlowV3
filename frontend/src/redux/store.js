import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardSlice.js"
const store = configureStore({
    reducer :{
        //redux slices
        boards : boardsSlice.reducer,
    }
})
export default store