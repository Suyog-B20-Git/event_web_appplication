// import { createSlice } from "@reduxjs/toolkit";
// import { Organiser } from "../apiurls.";
// import axios from "axios";
// const organiserSlice = createSlice({
//   name: "organiser",
//   initialState: {
//     organisers: [],
//     error: "",
//     isLoading: true,
//   },
//   reducers: {
//     fetchOrganiser: async (state, action) => {
//       try {
//         const response = await axios.get(Organiser.fetchOrganiser);
//         state.organisers = await response.data;
//         state.isLoading = false;

//         return state.organisers;
//       } catch (error) {
//         state.error = error.message;
//         state.isLoading = false;
//         return state.error;
//       }
//     },
//     addOrganiser: async (state, action) => {
//       try {
//         const response = await axios.post(
//           Organiser.addOrganiser,
//           action.payload
//         );
//         state.organisers.push(response.data);
//         state.isLoading = false;
//         return state.organisers;
//       } catch {
//         state.error = "Error adding organiser";
//         state.isLoading = false;
//         return state.error;
//       }
//     },
//   },
// });

// export const { fetchOragniser, addOrganiser } = organiserSlice.actions;
// export default organiserSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Organiser } from "../apiurls."; // Ensure this is correctly defined

// Async Thunk for Fetching Organisers
export const fetchOrganisers = createAsyncThunk(
  "organiser/fetchOrganisers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(Organiser.fetchOrganiser);
      return response.data.organizers; // Only return organisers list
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Adding Organiser
export const addOrganiser = createAsyncThunk(
  "organiser/addOrganiser",
  async (newOrganiser, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNzM5MDEwODcwLCJleHAiOjE3MzkwMTQ0NzB9.Jck0AsLW2kcPGMDYpcirNT6jgvjGjjUM7t101LPr3AM",
        },
      };

      const response = await axios.post(
        Organiser.addOrganiser,
        newOrganiser,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Organiser Slice
const organiserSlice = createSlice({
  name: "organiser",
  initialState: {
    organisers: [],
    error: null,
    isLoading: false,
  },
  reducers: {}, // No need for reducers since async actions are handled in extraReducers

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganisers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganisers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organisers = action.payload;
      })
      .addCase(fetchOrganisers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addOrganiser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrganiser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organisers.push(action.payload);
      })
      .addCase(addOrganiser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default organiserSlice.reducer;
