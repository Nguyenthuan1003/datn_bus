import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate} from "~/app/api/confighHTTp";

export const getAllTrip = createAsyncThunk(
    'trip/getAllTrip',
    async (searchParams) => {
      const response = await axiosPrivate.get('/search/trip', {
        params: searchParams
      });
      console.log('Search results:', response.data?.data);
      return response.data?.data;
    }
  );
