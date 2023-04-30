import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './Redux/Reducers/Main';

const Store = configureStore({ reducer: RootReducer })

export default Store;