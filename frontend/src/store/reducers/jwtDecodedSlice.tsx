import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface JwtDecoded {
  id: string;
  rol: string;
}

const initialState: JwtDecoded = {
  id: "",
  rol: "",
};

export const jwtDecodedSlice = createSlice({
  name: "jwtDecoded",
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<JwtDecoded>) => {
      (state.id = action.payload.id), (state.rol = action.payload.rol);
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = jwtDecodedSlice.actions;
export default jwtDecodedSlice.reducer;
