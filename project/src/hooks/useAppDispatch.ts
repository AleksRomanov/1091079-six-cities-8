import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
// import {AppDispatch} from '../store/app-reducer/app-reducer';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
