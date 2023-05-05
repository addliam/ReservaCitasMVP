import { configureStore } from "@reduxjs/toolkit";
// export default jwtDecodedSlice.reducer;
import jwtDecodedReducer from "./reducers/jwtDecodedSlice";
export const store = configureStore({
  reducer: {
    jwtDecoded: jwtDecodedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
