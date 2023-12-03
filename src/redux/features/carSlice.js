import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  carsData: [],
  carsBasket: [],
};

export const fetchCarsData = createAsyncThunk("car", async () => {
  const { data } = await axios.get("http://localhost:3001/cars");
  return data;
});

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingCar = state.carsBasket.find(
        (car) => car.id === action.payload.id
      );
      if (existingCar && existingCar.count) {
        state.carsBasket = state.carsBasket.map((car) =>
          car.id === action.payload.id ? { ...car, count: car.count + 1 } : car
        );
      } else {
        state.carsBasket = [
          ...state.carsBasket,
          { ...action.payload, count: 1 },
        ];
      }
    },
    decrementCarsBasket: (state, action) => {
      state.carsBasket = state.carsBasket.map((car) =>
        car.id === action.payload
          ? { ...car, count: car.count > 1 ? car.count - 1 : 1 }
          : car
      );
    },
    incrementCarsBasket: (state, action) => {
      state.carsBasket = state.carsBasket.map((car) =>
        car.id === action.payload ? { ...car, count: car.count + 1 } : car
      );
    },
    removeCarsBasket: (state, action) => {
      state.carsBasket = state.carsBasket.filter(
        (car) => car.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarsData.fulfilled, (state, action) => {
      state.carsData = action.payload;
    });
  },
});
export const {
  addToBasket,
  removeCarsBasket,
  decrementCarsBasket,
  incrementCarsBasket,
} = carSlice.actions;

export default carSlice.reducer;
