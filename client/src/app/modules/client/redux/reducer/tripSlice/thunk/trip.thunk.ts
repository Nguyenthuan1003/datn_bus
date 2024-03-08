import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "~/app/api/configHTTp";

export const getAllTrip = createAsyncThunk(
    'trip/getAllTrip',
    async (searchParams) => {
      const response = await axiosPrivate.get('/search/trip', {
        params: searchParams
      });
      return response.data;
    }
  );