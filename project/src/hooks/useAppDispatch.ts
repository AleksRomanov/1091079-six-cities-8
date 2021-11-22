import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/reducer';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
